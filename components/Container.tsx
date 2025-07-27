import { YStack } from 'tamagui';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <YStack flex={1} padding="$6">
      {/* Ensure all text is properly wrapped */}
      {typeof children === 'string' ? <Text>{children}</Text> : children}
    </YStack>
  );
};
