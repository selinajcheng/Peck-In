import { Link, Stack } from 'expo-router';

import { Main, View, YStack, Text } from 'tamagui';

export default function NotFoundScreen() {
  return (
    <View>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Main>
        <YStack>
          <Text>{"This screen doesn't exist."}</Text>
          <Link href="/">
            <Text>Go to home screen!</Text>
          </Link>
        </YStack>
      </Main>
    </View>
  );
}
