import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { AppColors } from '../../../styles/colors';

export const Container = styled.View`
  padding: 15px;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: #fff;
  font-family: 'Poppins-Regular';
`;

export const TitleBar = styled(LinearGradient).attrs({
  colors: [AppColors.primary.color_2, AppColors.primary.color_1],
  start: [0.9, 0.5],
})`
  width: 45px;
  height: 3px;
  border-radius: 5px;
`;

export const Content = styled.View`
  margin-top: 25px;
  padding: 0px 20px;
`;

export const VideoThumb = styled.Image`
  width: 100%;
  height: 190px;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const VideoTitle = styled.Text`
  font-family: 'Poppins-Light';
  font-size: 16px;
  color: #fff;
  text-align: center;
  margin-top: 15px;
`;

export const ButtonContainer = styled.View`
  align-items: center;
  margin-top: 20px;
`;

export const CheckboxContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-self: center;
  align-items: center;
  width: 160px;
  margin: 20px 0;
`;
