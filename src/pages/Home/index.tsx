import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, FlatList } from 'react-native';

import { VideoRow } from '../../components';

import { IVideo, useVideoManager } from '../../hooks/videoManager';

import { Container, AddVideoButton, AddVideoButtonText } from './styles';

const Index: React.FC = () => {
  const { navigate } = useNavigation();
  const { videos } = useVideoManager();

  const handleAddButtonClick = () => {
    navigate('VideoLink');
  };

  return (
    <Container>
      <Text>Holi shit man duwdh</Text>
      <FlatList
        data={videos}
        renderItem={item => <VideoRow video={item} />}
        keyExtractor={item => item.id}
      />

      <AddVideoButton onPress={handleAddButtonClick}>
        <AddVideoButtonText>+</AddVideoButtonText>
      </AddVideoButton>
    </Container>
  );
};

export default Index;
