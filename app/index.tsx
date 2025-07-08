import { Stack, Link, router } from 'expo-router';
import { YStack, XStack, Button, Text, H2, Separator } from 'tamagui';

import { useAuth } from '~/hooks/useAuth';
import { logOut } from '~/utils/firebaseAuth';
import { Container } from '~/components/Container';

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth();

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: 'Peck-In' }} />
        <Container>
          <YStack flex={1} justifyContent="center" alignItems="center">
            <Text>Loading...</Text>
          </YStack>
        </Container>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Peck-In' }} />
      <Container>
        <YStack flex={1} justifyContent="center" gap="$4">
          <YStack alignItems="center" gap="$3">
            <H2>Welcome to Peck-In!</H2>

            {isAuthenticated ? (
              // Authenticated user view
              <YStack gap="$3" alignItems="center">
                <Text fontSize="$6" color="$green10">
                  ✓ You are signed in
                </Text>

                <YStack gap="$2" alignItems="center">
                  <Text fontWeight="bold">User Info:</Text>
                  <Text>Email: {user?.email}</Text>
                  <Text fontSize="$2" color="$gray10">
                    User ID: {user?.uid}
                  </Text>
                </YStack>

                <Separator marginVertical="$2" />

                <XStack gap="$3">
                  <Link href={`/details?name=${user?.email}`} asChild>
                    <Button>View Details Page</Button>
                  </Link>

                  <Button
                    onPress={handleLogOut}
                    backgroundColor="$red10"
                    pressStyle={{ backgroundColor: '$red9' }}>
                    Sign Out
                  </Button>
                </XStack>
              </YStack>
            ) : (
              // Non-authenticated user view
              <YStack gap="$3" alignItems="center">
                <Text fontSize="$4" color="$gray10" textAlign="center">
                  Please sign in to access your account
                </Text>

                <Button
                  onPress={() => router.push('/login' as any)}
                  backgroundColor="$blue10"
                  pressStyle={{ backgroundColor: '$blue9' }}
                  size="$5">
                  Sign In / Sign Up
                </Button>
              </YStack>
            )}
          </YStack>
        </YStack>
      </Container>
    </>
  );
}
