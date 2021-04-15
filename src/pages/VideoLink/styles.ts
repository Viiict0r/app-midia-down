import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

import { Background } from '../../components';
import { AppColors } from '../../styles/colors';

export const Container = styled(Background)`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  padding: 10px 15px;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

export const HeaderTitleContainer = styled.View`
  align-items: center;
  flex: 1;
`;

export const HeaderTitle = styled.Text`
  font-family: 'Poppins-Regular';
  color: #fff;
  font-size: 18px;
`;

export const BackButton = styled.TouchableOpacity`
  padding: 10px;
`;

export const Input = styled.TextInput`
  border-width: 1px;
  border-color: #232323;
  padding: 5px;
  margin-bottom: 10px;
`;

export const LoadingText = styled.Text`
  margin-top: 10px;
  margin-bottom: 10px;

  align-self: center;
`;

export const Content = styled.View`
  padding: 20px;
  margin-top: 25px;
`;

export const Title = styled.Text`
  color: #fff;
  font-family: 'Poppins-Bold';
  font-size: 16px;
  margin-bottom: 5px;
`;

export const Info = styled.Text`
  color: #fff;
  font-family: 'Poppins-Light';
  font-size: 14px;
`;

export const ActionContainer = styled.View`
  margin-top: 15px;
  align-items: center;
`;

export const ErrorText = styled.Text`
  font-family: 'Poppins-Light';
  font-size: 14px;
  color: ${AppColors.error};
  text-align: center;
`;

export const ModalContainer = styled.View`
  position: absolute;
  flex: 1;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.4);

  align-items: center;
`;

export const Modal = styled(Background)`
  width: 90%;
  top: 25%;
  padding: 15px;
  border-radius: 10px;
`;

export const ModalContent = styled.View`
  margin-top: 20px;
`;

export const ModalTitle = styled.Text`
  font-size: 16px;
  color: #fff;
  font-family: 'Poppins-Regular';
`;

export const ModalTitleBar = styled(LinearGradient).attrs({
  colors: [AppColors.primary.color_2, AppColors.primary.color_1],
  start: [0.9, 0.5],
})`
  width: 45px;
  height: 3px;
  border-radius: 5px;
`;

export const VideoThumb = styled.Image.attrs({
  style: {
    resizeMode: 'cover',
  },
})`
  width: 100%;
  height: 180px;
  border-radius: 10px;
`;

export const VideoTitle = styled.Text`
  font-family: 'Poppins-Light';
  font-size: 14px;
  color: #fff;
  text-align: center;
  margin-top: 10px;
`;

export const Cancel = styled.Text`
  font-family: 'Poppins-Regular';
  color: ${AppColors.error};
`;

export const CancelContainer = styled.View`
  align-items: center;
  margin-top: 10px;
`;
