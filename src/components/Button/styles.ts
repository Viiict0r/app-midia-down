import styled, { css } from 'styled-components/native';

import { LinearGradient } from 'expo-linear-gradient';
import { RectButton } from 'react-native-gesture-handler';

interface ContainerProps {
  isDisabled: boolean;
}

export const Container = styled(LinearGradient)<ContainerProps>`
  position: relative;
  height: 36px;
  width: 210px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;

  ${props =>
    props.isDisabled &&
    css`
      opacity: 0.6;
    `}
`;

export const StyledButton = styled(RectButton)`
  border-radius: 15px;
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-size: 14px;
  font-family: 'Poppins-Light';
  color: #fff;
`;
