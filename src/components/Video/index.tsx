import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import { IVideo, VideoDownloadStatus } from '../../hooks/useVideoManager/types';

import {
  Container,
  Thumbnail,
  VideoInfo,
  VideoTitle,
  VideoSocialType,
  ThumbnailContainer,
  ThumbnailLayer,
  VideoPorcentage,
  ActionIcon,
  VideoProgress,
  VideoProgressStatus,
  VideoSuccessInfo,
  VideoErrorInfo,
} from './styles';

interface VideoProps {
  video: IVideo;
}

export const Video: React.FC<VideoProps> = ({ video }) => {
  const parseVideoSizeToMegabytes = () => {
    return `${((video.size || 0) / 1000000).toFixed(2)}mb`;
  };

  const parseVideoProgress = () => {
    const bytes_downloaded =
      (video.download.progress * 100 * (video.size || 0)) / 100;
    const percentage = Math.round(video.download.progress * 100);
    const megabytes_downloaded = (bytes_downloaded / 1000000).toFixed(2);
    const total_megabytes = ((video.size || 0) / 1000000).toFixed(2);

    return {
      downloaded: `${megabytes_downloaded}mb / ${total_megabytes}mb`,
      percentage: `${percentage}%`,
    };
  };

  return (
    <Container>
      <ThumbnailContainer>
        {video.download.status === VideoDownloadStatus.PROGRESS && (
          <ThumbnailLayer>
            <VideoPorcentage>
              <FAIcon name="pause" color="#fff" size={20} />
            </VideoPorcentage>
          </ThumbnailLayer>
        )}
        <Thumbnail
          source={{
            uri:
              video.thumb ||
              'https://lh3.googleusercontent.com/proxy/NCNihp7CezU2ZfcjKaSbWoEGg5X3MG1nNRF1VOQTkMotR_6bZvj9wkX6QAzTfomiOP1kLs_Bv_IEm-kc30kj6daCjJqkmXl3-sYvI04Pfw',
          }}
          style={{ resizeMode: 'cover' }}
        />
      </ThumbnailContainer>
      <VideoInfo>
        <VideoTitle>Lorem ipsum dor let sir</VideoTitle>
        <VideoSocialType>Facebook video</VideoSocialType>

        {video.download.status === VideoDownloadStatus.COMPLETE && (
          <VideoProgress>
            {parseVideoSizeToMegabytes()} -{' '}
            <VideoSuccessInfo>Baixado</VideoSuccessInfo>
          </VideoProgress>
        )}

        {video.download.status === VideoDownloadStatus.FAILURE && (
          <VideoProgress>
            {parseVideoSizeToMegabytes()} -{' '}
            <VideoErrorInfo>Falha no download</VideoErrorInfo>
          </VideoProgress>
        )}

        {video.download.status === VideoDownloadStatus.PROGRESS && (
          <VideoProgress>
            {parseVideoProgress().downloaded} {parseVideoProgress().percentage}{' '}
            - <VideoProgressStatus>Baixando...</VideoProgressStatus>
          </VideoProgress>
        )}

        {video.download.status === VideoDownloadStatus.INITIALIZING && (
          <VideoProgress>
            <VideoProgressStatus>Iniciando download...</VideoProgressStatus>
          </VideoProgress>
        )}
      </VideoInfo>
      <ActionIcon>
        <TouchableOpacity>
          <Icon name="more-vertical" size={20} color="#fff" />
        </TouchableOpacity>
      </ActionIcon>
    </Container>
  );
};
