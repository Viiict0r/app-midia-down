import styled, { css } from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { AppColors } from '../../styles/colors';

interface ContainerProps {
  disabled: boolean;
}

export const Container = styled.View<ContainerProps>`
  flex-direction: row;
  align-items: center;

  ${props =>
    props.disabled &&
    css`
      opacity: 0.4;
    `}
`;

export const CircleContent = styled(LinearGradient).attrs({
  colors: [AppColors.primary.color_2, AppColors.primary.color_1],
})`
  flex: 1;
  border-radius: 10px;
`;

export const Circle = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  background-color: transparent;
  padding: 3px;

  height: 22px;
  width: 22px;

  border-width: 1px;
  border-color: ${AppColors.primary.color_1};
  border-radius: 10px;
`;

export const Label = styled.Text`
  color: #fff;
  font-size: 16px;
  font-family: 'Poppins-Light';
  line-height: 22px;
  margin-left: 8px;
`;
