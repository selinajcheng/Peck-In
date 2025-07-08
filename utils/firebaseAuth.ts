import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth } from './firebase';

/**
 * Creates a new user account with email and password authentication.
 * Optionally sets a display name for the user profile.
 *
 * @param {string} email - The user's email address (must be valid email format)
 * @param {string} password - The user's password (minimum 6 characters required by Firebase)
 * @param {string} [displayName] - Optional display name to set for the user profile
 * @returns {Promise<UserCredential>} Promise that resolves to the UserCredential object containing user info
 * @throws {Error} Throws error if email is invalid, password is too weak, email already exists, or network issues
 *
 * @example
 * ```typescript
 * // Basic sign up
 * try {
 *   const userCredential = await signUp('user@example.com', 'password123');
 *   console.log('User created:', userCredential.user.uid);
 * } catch (error) {
 *   console.error('Sign up failed:', error.message);
 * }
 * ```
 */
export const signUp = async (
  email: string,
  password: string,
  displayName?: string
): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Update display name if provided
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
    }

    return userCredential;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

/**
 * Authenticates an existing user with email and password.
 *
 * @param {string} email - The user's registered email address
 * @param {string} password - The user's password
 * @returns {Promise<UserCredential>} Promise that resolves to the UserCredential object
 * @throws {Error} Throws error if credentials are invalid, user not found, or account is disabled
 *
 * @example
 * ```typescript
 * // Sign in user
 * try {
 *   const userCredential = await signIn('user@example.com', 'password123');
 *   console.log('User signed in:', userCredential.user.email);
 *
 *   // Access user information
 *   const user = userCredential.user;
 *   console.log('User ID:', user.uid);
 *   console.log('Email verified:', user.emailVerified);
 * } catch (error) {
 *   switch (error.code) {
 *     case 'auth/user-not-found':
 *       console.error('No account found with this email');
 *       break;
 *     case 'auth/wrong-password':
 *       console.error('Incorrect password');
 *       break;
 *     case 'auth/invalid-email':
 *       console.error('Invalid email format');
 *       break;
 *     default:
 *       console.error('Sign in failed:', error.message);
 *   }
 * }
 * ```
 */
export const signIn = async (email: string, password: string): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

/**
 * Signs out the currently authenticated user.
 * Clears the authentication state and redirects to login if needed.
 *
 * @returns {Promise<void>} Promise that resolves when sign out is complete
 * @throws {Error} Throws error if sign out fails due to network issues
 *
 * @example
 * ```typescript
 * // Sign out current user
 * try {
 *   await logOut();
 *   console.log('User signed out successfully');
 *   // Redirect to login page or update UI state
 * } catch (error) {
 *   console.error('Sign out failed:', error.message);
 * }
 *
 * // Usage in a component with navigation
 * const handleLogout = async () => {
 *   try {
 *     await logOut();
 *     router.push('/login'); // Navigate to login screen
 *   } catch (error) {
 *     Alert.alert('Error', 'Failed to sign out. Please try again.');
 *   }
 * };
 * ```
 */
export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

/**
 * Retrieves the currently authenticated user synchronously.
 * Returns null if no user is signed in.
 *
 * @returns {User | null} The current user object or null if not authenticated
 *
 * @example
 * ```typescript
 * // Check current user
 * const user = getCurrentUser();
 * if (user) {
 *   console.log('Current user:', user.email);
 *   console.log('User ID:', user.uid);
 *   console.log('Display name:', user.displayName);
 *   console.log('Email verified:', user.emailVerified);
 * } else {
 *   console.log('No user is currently signed in');
 * }
 *
 * // Usage in a component
 * const UserProfile = () => {
 *   const user = getCurrentUser();
 *
 *   if (!user) {
 *     return <Text>Please sign in</Text>;
 *   }
 *
 *   return (
 *     <YStack>
 *       <Text>Welcome, {user.displayName || user.email}!</Text>
 *       <Text>Account created: {user.metadata.creationTime}</Text>
 *     </YStack>
 *   );
 * };
 * ```
 */
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

/**
 * Sets up a listener for authentication state changes.
 * Fires whenever a user signs in, signs out, or the auth state changes.
 *
 * @param {function} callback - Function called with the current user (or null) when auth state changes
 * @returns {function} Unsubscribe function to stop listening to auth state changes
 *
 * @example
 * ```typescript
 * // Set up auth state listener
 * const unsubscribe = onAuthStateChange((user) => {
 *   if (user) {
 *     console.log('User signed in:', user.email);
 *     // Update app state, redirect to dashboard, etc.
 *   } else {
 *     console.log('User signed out');
 *     // Redirect to login, clear user data, etc.
 *   }
 * });
 *
 * // Clean up listener when component unmounts
 * useEffect(() => {
 *   const unsubscribe = onAuthStateChange((user) => {
 *     setCurrentUser(user);
 *     setIsLoading(false);
 *   });
 *
 *   return () => unsubscribe(); // Cleanup on unmount
 * }, []);
 *
 * // Usage in a React Native app with navigation
 * const App = () => {
 *   const [user, setUser] = useState(null);
 *
 *   useEffect(() => {
 *     const unsubscribe = onAuthStateChange((user) => {
 *       setUser(user);
 *       if (user) {
 *         router.push('/dashboard');
 *       } else {
 *         router.push('/login');
 *       }
 *     });
 *
 *     return unsubscribe;
 *   }, []);
 *
 *   return user ? <AuthenticatedApp /> : <LoginScreen />;
 * };
 * ```
 */
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Checks if a user is currently authenticated (signed in).
 * This is a convenience function that returns a boolean.
 *
 * @returns {boolean} True if user is authenticated, false otherwise
 *
 * @example
 * ```typescript
 * // Simple authentication check
 * if (isAuthenticated()) {
 *   console.log('User is signed in');
 *   // Show authenticated content
 * } else {
 *   console.log('User is not signed in');
 *   // Show login form
 * }
 *
 * // Usage in navigation guard
 * const ProtectedRoute = ({ children }) => {
 *   if (!isAuthenticated()) {
 *     return <Redirect href="/login" />;
 *   }
 *   return children;
 * };
 *
 * // Usage in component conditional rendering
 * const Header = () => {
 *   return (
 *     <YStack>
 *       <Text>Welcome to Peck-In</Text>
 *       {isAuthenticated() ? (
 *         <Button onPress={logOut}>Sign Out</Button>
 *       ) : (
 *         <Link href="/login">
 *           <Button>Sign In</Button>
 *         </Link>
 *       )}
 *     </YStack>
 *   );
 * };
 * ```
 */
export const isAuthenticated = (): boolean => {
  return !!auth.currentUser;
};
