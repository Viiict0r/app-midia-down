import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import { IVideo } from '../../hooks/videoManager';

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
} from './styles';

interface VideoProps {
  video: IVideo;
}

export const Video: React.FC<VideoProps> = ({ video }) => {
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
        <ThumbnailLayer>
          <VideoPorcentage>
            <FAIcon name="pause" color="#fff" size={20} />
          </VideoPorcentage>
        </ThumbnailLayer>
        <Thumbnail
          source={{
            uri: video.thumb,
          }}
          style={{ resizeMode: 'cover' }}
        />
      </ThumbnailContainer>
      <VideoInfo>
        <VideoTitle>Lorem ipsum dor let sir</VideoTitle>
        <VideoSocialType>Facebook video</VideoSocialType>
        <VideoProgress>
          {parseVideoProgress().downloaded} {parseVideoProgress().percentage} -{' '}
          <VideoProgressStatus>Baixando...</VideoProgressStatus>
        </VideoProgress>
      </VideoInfo>
      <ActionIcon>
        <TouchableOpacity>
          <Icon name="more-vertical" size={20} color="#fff" />
        </TouchableOpacity>
      </ActionIcon>
    </Container>
  );
};
