import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  background-color: gray;
  flex: 1;
`;

export const AddVideoButton = styled(RectButton)`
  position: absolute;
  background-color: blue;
  width: 60px;
  height: 60px;
  border-radius: 30px;

  align-items: center;
  justify-content: center;

  bottom: 20px;
  right: 10px;
`;

export const AddVideoButtonText = styled.Text`
  font-size: 30px;
  padding: 0;
  margin: 0;
  color: #fff;
`;
