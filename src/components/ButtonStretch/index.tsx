import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { IButton } from '../../interfaces/IButton';
import { Container, Text } from './styles';

interface IButtonStrechProps extends IButton {
  isBlinking?: boolean;
}

export default function ButtonStrech({ text, onPress, isBlinking }: IButtonStrechProps) {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.7,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(animate);
    };

    animate();
  }, [fadeAnim]);

  return (
    <Animated.View style={{ opacity: isBlinking ? fadeAnim : 1 }}>
      <Container onPress={onPress}>
        <Text>{text}</Text>
      </Container>
    </Animated.View>
  )
}
