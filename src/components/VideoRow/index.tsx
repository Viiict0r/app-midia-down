import React from 'react';
import { ListRenderItemInfo, Text } from 'react-native';

import { IVideo } from '../../hooks/videoManager';

import { Container } from './styles';

interface VideoRowProps {
  video: ListRenderItemInfo<IVideo>;
}

export const VideoRow = ({ video }: VideoRowProps) => {
  return (
    <Container>
      <Text>{video.item.id}</Text>
      <Text>
        {video.item.size || '0'} - {video.item.download.progress} -{' '}
        {video.item.download.completed ? 'Baixado' : 'Baixando...'}
      </Text>
    </Container>
  );
};
