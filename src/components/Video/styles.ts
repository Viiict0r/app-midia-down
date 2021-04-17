import styled from 'styled-components/native';

import { AppColors } from '../../styles/colors';

export const Container = styled.View`
  border-radius: 10px;
  background-color: #94949424;
  margin-top: 20px;
  flex-direction: row;
`;

export const Thumbnail = styled.Image`
  height: 80px;
  width: 100px;

  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const ThumbnailContainer = styled.View`
  height: 80px;
  width: 100px;
  position: relative;
`;

export const ThumbnailLayer = styled.View`
  height: 80px;
  width: 100px;
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  z-index: 1;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;

  align-items: center;
  justify-content: center;
`;

export const VideoPorcentage = styled.Text`
  font-size: 18px;
  font-family: 'Poppins-Regular';
  color: #fff;
`;

export const VideoInfo = styled.View`
  flex: 1;
  justify-content: center;
  margin-left: 10px;
`;

export const VideoSuccessInfo = styled.Text`
  font-family: 'Poppins-Light';
  font-size: 12px;
  color: ${AppColors.success};
`;

export const VideoErrorInfo = styled.Text`
  font-family: 'Poppins-Light';
  font-size: 12px;
  color: ${AppColors.error};
`;

export const VideoTitle = styled.Text`
  font-size: 14px;
  font-family: 'Poppins-Regular';
  color: #fff;
`;

export const VideoSocialType = styled.Text`
  font-size: 10px;
  font-family: 'Poppins-Light';
  color: #fff;
  margin-top: -3px;
  opacity: 0.4;
`;

export const VideoProgress = styled.Text`
  margin-top: 5px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  font-family: 'Poppins-Light';
`;

export const VideoProgressStatus = styled.Text`
  color: #fff;
  font-family: 'Poppins-Light';
`;

export const ActionIcon = styled.View`
  align-items: center;
  padding: 15px 8px;
`;
