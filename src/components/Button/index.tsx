import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { AppColors } from '../../styles/colors';

import { Container, StyledButton, ButtonText } from './styles';

interface ButtonProps extends RectButtonProps {
  text: string;
  loading?: boolean;
  disabled?: boolean;
  style?: any;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  loading = false,
  disabled = false,
  style = [],
  ...rest
}) => {
  return (
    <Container
      isDisabled={disabled || loading}
      colors={[AppColors.primary.color_2, AppColors.primary.color_1]}
      start={[0.9, 0.5]}
      style={style}
    >
      <StyledButton rippleColor={AppColors.background.color_1} {...rest}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <ButtonText>{text}</ButtonText>
        )}
      </StyledButton>
    </Container>
  );
};
