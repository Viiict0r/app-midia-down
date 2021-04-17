import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import { LinearGradient } from 'expo-linear-gradient';
import { Background } from '../../components';
import { AppColors } from '../../styles/colors';

export const Container = styled(Background)`
  flex: 1;
`;

export const AddVideoButton = styled(RectButton).attrs({
  rippleColor: AppColors.background.color_1,
})`
  width: 100%;
  border-radius: 30px;
  flex: 1;

  align-items: center;
  justify-content: center;
`;

export const Gradient = styled(LinearGradient)`
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 30px;

  align-items: center;
  justify-content: center;

  bottom: 30px;
  right: 25px;
`;

export const HomeTitleContainer = styled.View`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const HomeTitleText = styled.Text`
  font-family: 'Poppins-SemiBold';
  color: #fff;
  font-size: 22px;
`;

export const HomeTitleBar = styled(LinearGradient).attrs({
  colors: [AppColors.primary.color_2, AppColors.primary.color_1],
  start: [0.9, 0.5],
})`
  width: 45px;
  height: 3px;
  border-radius: 5px;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: 45%;
  padding: 25px;
`;

export const EmptyIcon = styled.View`
  text-align: center;
  color: #fff;
`;

export const EmptyText = styled.Text`
  margin-top: 15px;
  text-align: center;
  font-family: 'Poppins-Light';
  color: #fff;
  font-size: 16px;
`;

// export const Header = styled.View`
//   /* margin-top: 28px; */
// `;

// export const LogoContainer = styled.View`
//   align-items: center;
// `;

// export const LogoImage = styled.Image`
//   height: 50px;
//   width: 120px;
// `;

// export const LogoIcons = styled.View`
//   margin-top: 15px;
//   flex-direction: row;
//   justify-content: center;
// `;
