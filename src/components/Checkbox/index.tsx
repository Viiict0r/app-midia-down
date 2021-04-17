import React, { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

// @refresh reset

import { Container, Circle, CircleContent, Label } from './styles';

interface CheckboxProps {
  label: string;
  onPress: () => void;
  selected?: boolean;
  disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  selected = false,
  disabled = false,
  onPress,
}) => {
  const offset = useSharedValue(0); // opacity

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(offset.value, {
        duration: 150,
      }),
    };
  });

  const handleCheckboxPress = () => {
    if (disabled) return;

    onPress();
  };

  useEffect(() => {
    offset.value = selected ? 1 : 0;
  }, [selected, offset]);

  return (
    <Container disabled={disabled}>
      <Circle onPress={handleCheckboxPress}>
        <Animated.View style={[{ flex: 1 }, animatedStyles]}>
          <CircleContent />
        </Animated.View>
      </Circle>

      <Label>{label}</Label>
    </Container>
  );
};
