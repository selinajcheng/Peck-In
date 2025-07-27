import { Stack, useLocalSearchParams } from 'expo-router';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

import type { SizeTokens } from 'tamagui';

import { Switch } from '@tamagui/switch';
import { YStack } from 'tamagui';

export default function Details() {
  const params = useLocalSearchParams();
  const name = Array.isArray(params.name) ? params.name[0] : params.name || 'Unknown';

  return (
    <>
      <Stack.Screen options={{ title: 'Details' }} />
      <Container>
        <YStack>
          <ScreenContent
            path="screens/details.tsx"
            titleStyle={{ fontSize: 18 }}
            title={`Showing details for ${name}`}
          />
          <Switch size="$4" backgroundColor="$purple8">
            <Switch.Thumb animation="bouncy" backgroundColor="white" />
          </Switch>
        </YStack>
      </Container>
    </>
  );
}
