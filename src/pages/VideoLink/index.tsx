// @refresh reset

import React, { useState } from 'react';
import { Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { isURL } from '../../downloader/validations/isURL';
import { FBDownloader } from '../../downloader/socials/fb.downloader';

import { useVideoManager } from '../../hooks/videoManager';

import {
  Container,
  Input,
  VideoThumbnail,
  VideoThumbnailImage,
} from './styles';

enum ScreenState {
  LOADING = 'loading', // Fetching video
  CONFIRM = 'confirm', // Confirm and download video
  INITIAL = 'initial',
}

const VideoLink: React.FC = () => {
  const [thumbImage, setThumbImage] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [screenState, setScreenState] = useState<ScreenState>(
    ScreenState.INITIAL,
  );

  const { addVideo } = useVideoManager();
  const { navigate } = useNavigation();

  const handleVideoLinkChange = (link: string) => {
    setInputValue(link);
  };

  const handleVideoDownload = async () => {
    if (screenState === ScreenState.CONFIRM) {
      // Add video download to queue

      addVideo(videoLink, thumbImage);

      navigate('Home');

      return;
    }

    if (!isURL(inputValue)) {
      Alert.alert('Erro', 'Opa, link inválido');
      return;
    }

    setScreenState(ScreenState.LOADING);

    try {
      const downloader = new FBDownloader();
      const result = await downloader.fetchMidiaLink(inputValue);

      if (result.thumbURL && result.videoURL) {
        setThumbImage(result.thumbURL);
        setVideoLink(result.videoURL);

        setScreenState(ScreenState.CONFIRM);
        return;
      }

      Alert.alert('Ops', 'Não foi possível obter informações desse vídeo.');
    } catch (error) {
      console.log(error);
      Alert.alert('Ops', 'Ocorreu um probleminha :(');

      setScreenState(ScreenState.INITIAL);
    }
  };

  return (
    <Container>
      <VideoThumbnail>
        {thumbImage !== '' && (
          <VideoThumbnailImage
            resizeMode="cover"
            source={{ uri: thumbImage }}
          />
        )}
      </VideoThumbnail>

      <Input
        onChangeText={handleVideoLinkChange}
        value={inputValue}
        placeholder="Link do video aqui"
      />

      <Button
        disabled={screenState === ScreenState.LOADING}
        title={
          screenState === ScreenState.CONFIRM ? 'Confirmar e baixar' : 'Baixar'
        }
        onPress={handleVideoDownload}
      />
    </Container>
  );
};

export default VideoLink;
