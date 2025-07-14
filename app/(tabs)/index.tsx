import { Stack, Link, router } from 'expo-router';
import { YStack, XStack, Button, Text, H2, Paragraph, Square } from 'tamagui';
import { useAuth } from '~/hooks/useAuth';
import { Container } from '~/components/Container';
import { ChevronDown } from '@tamagui/lucide-icons';
import { Accordion } from '@tamagui/accordion';

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

                {/* <Accordion overflow="hidden" width="$20" type="multiple">
                  <Accordion.Item value="a1">
                    <Accordion.Trigger flexDirection="row" justifyContent="space-between">
                      {({
                        open,
                      }: {
                        open: boolean
                      }) => (
                        <>
                          <Paragraph>1. Take a cold shower</Paragraph>
                          <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                            <ChevronDown size="$1" />
                          </Square>
                        </>
                      )}
                    </Accordion.Trigger>
                    <Accordion.HeightAnimator animation="medium">
                      <Accordion.Content animation="medium" exitStyle={{ opacity: 0 }}>
                        <Paragraph>
                          Cold showers can help reduce inflammation, relieve pain, improve
                          circulation, lower stress levels, and reduce muscle soreness and fatigue.
                        </Paragraph>
                      </Accordion.Content>
                    </Accordion.HeightAnimator>
                  </Accordion.Item>

                  <Accordion.Item value="a2">
                    <Accordion.Trigger flexDirection="row" justifyContent="space-between">
                      {({
                        open,
                      }: {
                        open: boolean
                      }) => (
                        <>
                          <Paragraph>2. Eat 4 eggs</Paragraph>
                          <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                            <ChevronDown size="$1" />
                          </Square>
                        </>
                      )}
                    </Accordion.Trigger>
                    <Accordion.HeightAnimator animation="medium">
                      <Accordion.Content animation="medium" exitStyle={{ opacity: 0 }}>
                        <Paragraph>
                          Eggs have been a dietary staple since time immemorial and there’s good
                          reason for their continued presence in our menus and meals.
                        </Paragraph>
                      </Accordion.Content>
                    </Accordion.HeightAnimator>
                  </Accordion.Item>
                </Accordion> */}
              </YStack>
            ) : (
              // Non-authenticated user view
              <YStack gap="$3" alignItems="center">
                <Text fontSize="$4" color="$gray10" textAlign="center">
                  Please sign in to access your account
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
