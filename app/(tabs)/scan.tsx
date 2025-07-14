import { Stack } from 'expo-router';
import { YStack, Text, H2 } from 'tamagui';
import { useAuth } from '~/hooks/useAuth';
import { Container } from '~/components/Container';

export default function ScanScreen() {
    const { user, loading, isAuthenticated } = useAuth();

    return (
        <>
            <Stack.Screen options={{ title: 'Scan' }} />
            <Container>
                <YStack flex={1} justifyContent='center' gap="$4">
                    <YStack alignItems='center' gap="$3">
                        <H2>Scan Placeholder</H2>
                    </YStack>
                </YStack>
            </Container>
        </>
    )
}