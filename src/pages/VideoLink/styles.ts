import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import { Background } from '../../components';
import { AppColors } from '../../styles/colors';
import { SocialNetworkOption } from './types';

interface SocialContainerProps {
  selected: boolean;
}

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

export const SocialContainer = styled.View<SocialContainerProps>`
  margin-right: 15px;
  padding: 10px;
  min-width: 100px;

  border-width: 1px;
  border-color: #fff;
  border-radius: 15px;

  opacity: ${props => (props.selected ? '1' : '0.3')};
`;

export const SocialIcon = styled.View`
  align-items: center;
`;

export const SocialText = styled.Text`
  margin-top: 10px;
  font-size: 12px;
  font-family: 'Poppins-Regular';
  color: #fff;
  text-align: center;
`;

export const SocialBlock = styled.View`
  margin-top: 25px;
`;

export const SocialNetworkList = styled(
  FlatList as new () => FlatList<SocialNetworkOption>,
)`
  margin-top: 5px;
`;
