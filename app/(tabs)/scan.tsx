import { Stack } from 'expo-router';
import { YStack, Text, Button, XStack, styled } from 'tamagui';
import { useAuth } from '~/hooks/useAuth';
import { Container } from '~/components/Container';
import { router } from 'expo-router';
import { CameraView, CameraType, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { useState, useRef } from 'react';

export default function ScanScreen() {
  const { user, loading, isAuthenticated } = useAuth();
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [eventError, setEventError] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const isProcessingRef = useRef(false);

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ title: 'Scan' }} />
        <Container>
          <YStack flex={1} justifyContent="center" alignItems="center">
            <Text>Loading...</Text>
          </YStack>
        </Container>
      </>
    );
  }

  const handleBarcodeScanned = async ({ data }: BarcodeScanningResult) => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;
    setScanned(true);
    setScanResult(data);

    console.log(data);

    setTimeout(() => {
      setScanned(false);
      isProcessingRef.current = false;
    }, 3000);
  };

  if (scanResult) {
    return (
      <Container>
        <YStack flex={1} justifyContent="center" alignItems="center">
          <Text>Scan Result: {scanResult}</Text>
        </YStack>
      </Container>
    );
  }

  return (
    <>
      {/* <Stack.Screen options={{ title: 'Scan' }} /> */}
      <Container>
        <YStack flex={1} justifyContent="center" gap="$4">
          {isAuthenticated ? (
            // Authenticated user view
            <>
              {!permission || !permission.granted ? (
                <YStack flex={1} justifyContent="center" alignItems="center" padding="$4">
                  <Text marginBottom="$3" textAlign="center">
                    To scan events, we need camera permission.
                  </Text>
                  <Button onPress={requestPermission}>Grant Permission</Button>
                </YStack>
              ) : (
                <YStack flex={1}>
                  <YStack position="absolute" top={0} left={0} right={0} bottom={0}>
                    <Text color="white" textAlign="center" marginTop="$4">
                      Scan an event QR code below!
                    </Text>
                  </YStack>
                  <CameraView
                    ref={cameraRef}
                    style={{ flex: 1 }}
                    facing={facing}
                    onBarcodeScanned={handleBarcodeScanned}
                    barcodeScannerSettings={{
                      barcodeTypes: ['qr'],
                    }}
                    active={!scanned}></CameraView>
                </YStack>
              )}
            </>
          ) : (
            // Non-authenticated user view
            <YStack gap="$3" alignItems="center">
              <Text fontSize="$4" color="$gray10" textAlign="center">
                Please sign in to scan events.
              </Text>

              <Button
                onPress={() => router.navigate('/login')}
                backgroundColor="$purple10"
                pressStyle={{ backgroundColor: '$purple9' }}
                size="$5">
                Sign In / Sign Up
              </Button>
            </YStack>
          )}
        </YStack>
      </Container>
    </>
  );
}
