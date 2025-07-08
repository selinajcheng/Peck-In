import React, { useState } from 'react';
import { router, Stack } from 'expo-router';
import { YStack, XStack, Button, Text, Input, H2, Separator } from 'tamagui';
import { Alert } from 'react-native';
import { signUp, signIn } from '~/utils/firebaseAuth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    let success = false;

    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        await signUp(email, password);
        success = true;
      } else {
        await signIn(email, password);
        success = true;
      }
    } catch (error: any) {
      let errorMessage = 'Authentication failed';

      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email is already registered';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
        default:
          errorMessage = error.message || 'Authentication failed';
      }

      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);

      if (success) {
        router.dismissTo('/');
      }
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <>
      <Stack.Screen options={{ title: isSignUp ? 'Sign Up' : 'Sign In' }} />
      <YStack flex={1} padding="$6" justifyContent="center" gap="$4">
        <YStack alignItems="center" gap="$3">
          <H2>{isSignUp ? 'Create Account' : 'Welcome Back'}</H2>
          <Text color="$gray10" textAlign="center">
            {isSignUp ? 'Sign up to get started with Peck-In' : 'Sign in to continue to Peck-In'}
          </Text>
        </YStack>

        <YStack gap="$3">
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
          />
        </YStack>

        <YStack gap="$3">
          <Button
            onPress={handleAuth}
            disabled={loading}
            backgroundColor="$blue10"
            pressStyle={{ backgroundColor: '$blue9' }}>
            {loading ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>

          <XStack justifyContent="center" alignItems="center" gap="$2">
            <Separator flex={1} />
            <Text color="$gray10" fontSize="$2">
              OR
            </Text>
            <Separator flex={1} />
          </XStack>

          <Button onPress={toggleMode} variant="outlined" borderColor="$gray8">
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </Button>
        </YStack>
      </YStack>
    </>
  );
}
