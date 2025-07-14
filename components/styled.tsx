import { styled, SizableText, H1, YStack, Button as ButtonTamagui } from 'tamagui';

export const Container = styled(YStack, {
    flex: 1,
    padding: 24,
});

export const Main = styled(YStack, {
    flex: 1,
    justifyContent: 'space-between',
    maxWidth: 960,
});
  
export const Title = styled(H1, {
    color: '#000',
    size: '$12',
});
  
export const Subtitle = styled(SizableText, {
    color: '#38434D',
    size: '$9',
});
  
export const Button = styled(ButtonTamagui, {
    backgroundColor: '#6366F1',
    borderRadius: 28,
    hoverStyle: {
    backgroundColor: '#5a5fcf',
    },
    pressStyle: {
    backgroundColor: '#5a5fcf',
    },
    maxWidth: 500,

    // Shadows
    shadowColor: '#000',
    shadowOffset: {
    height: 2,
    width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // Button text
    color: '#FFFFFF',
    fontWeight: '600', // Is not passed down to the text. Probably a bug in Tamagui: https://github.com/tamagui/tamagui/issues/1156#issuecomment-1802594930
    fontSize: 16,
});