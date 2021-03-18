import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  padding: 20px;
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

export const VideoThumbnail = styled.View`
  background-color: gray;
  height: 200px;
  width: 100%;
  margin-bottom: 20px;
`;

export const VideoThumbnailImage = styled.Image`
  flex: 1;
`;
