import { Stack, Link, router } from 'expo-router';
import { YStack, XStack, Button, Text, H2, Paragraph, Square } from 'tamagui';
import { useAuth } from '~/hooks/useAuth';
import { Container } from '~/components/Container';
// import { ChevronDown } from '@tamagui/lucide-icons';
// import { Accordion } from '@tamagui/accordion';

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: 'Home' }} />
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
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <YStack flex={1} justifyContent="center" gap="$4">
          <YStack alignItems="center" gap="$3">
            <H2>Welcome to Peck-In!</H2>

            {isAuthenticated ? (
              // Authenticated user view
              <YStack gap="3">
                <XStack gap="$3">
                  <Link href={`/details?name=${user?.email}`} asChild>
                    <Button>View Details Page</Button>
                  </Link>
                </XStack>
              </YStack>
            ) : (
              // Non-authenticated user view
              <YStack gap="$3" alignItems="center">
                <Text fontSize="$4" color="$gray10" textAlign="center">
                  Please sign in to access your events.
                </Text>

                <Button
                  onPress={() => router.push('/login' as any)}
                  backgroundColor="$purple10"
                  pressStyle={{ backgroundColor: '$purple9' }}
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
