import { Stack } from 'expo-router';
import { YStack, Text, H2, Button } from 'tamagui';
import { useAuth } from '~/hooks/useAuth';
import { logOut } from '~/utils/firebaseAuth';
import { Container } from '~/components/Container';

export default function ProfileScreen() {
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
                <Stack.Screen options={{ title: 'Profile' }} />
                <Container>
                    <YStack flex={1} justifyContent='center' alignItems='center'>
                        <Text>Loading...</Text>
                    </YStack>
                </Container>
            </>
        );
    }

    return (
        <>
            <Stack.Screen options={{ title: 'Profile' }} />
            <Container>
                <YStack flex={1} justifyContent='center' gap="$4">
                    <YStack alignItems='center' gap="$3">
                        <H2>Profile</H2>

                        {isAuthenticated ? (
                            <YStack gap="$3" alignItems='center'>
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

                                <Button
                                    onPress={handleLogOut}
                                    backgroundColor="$red10"
                                    pressStyle={{ backgroundColor: '$red9' }}>
                                    <Text color="#ffffff">
                                        Sign Out
                                    </Text>
                                </Button>
                            </YStack>
                        ) : (
                            <YStack gap="$3" alignItems='center'>
                                <Text fontSize="$4" color="$gray10" textAlign='center'>
                                    Please sign in to view your profile.
                                </Text>
                            </YStack>
                        )}
                    </YStack>
                </YStack>
            </Container>
        </>
    )
};