// @refresh reset

import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Input, Button } from '../../components';

import { isURL } from '../../downloader/validations/isURL';
import { FBDownloader } from '../../downloader/socials/fb.downloader';

import { useVideoManager } from '../../hooks/videoManager';

import {
  Container,
  Header,
  HeaderTitle,
  HeaderTitleContainer,
  BackButton,
  Content,
  Title,
  Info,
  ActionContainer,
  ErrorText,
  ModalContainer,
  Modal,
  ModalTitle,
  VideoThumb,
  ModalContent,
  ModalTitleBar,
  VideoTitle,
  Cancel,
  CancelContainer,
} from './styles';

enum ScreenState {
  LOADING = 'loading', // Fetching video
  CONFIRM = 'confirm', // Confirm and download video
  INITIAL = 'initial',
}

const TEST_VIDEO_LINK =
  'https://www.facebook.com/MetDaanDIY/videos/3747701441995397/';

const VideoLink: React.FC = () => {
  const [thumbImage, setThumbImage] = useState('');
  const [videoLink, setVideoLink] = useState(TEST_VIDEO_LINK);
  const [inputValue, setInputValue] = useState(TEST_VIDEO_LINK);
  const [error, setError] = useState<string | null>(null);
  const [screenState, setScreenState] = useState<ScreenState>(
    ScreenState.INITIAL,
  );

  const { addVideo } = useVideoManager();
  const { navigate, goBack } = useNavigation();

  const handleVideoLinkChange = (link: string) => {
    setError(null);
    setInputValue(link);
  };

  const handleReset = () => {
    setVideoLink('');
    setInputValue('');
    setScreenState(ScreenState.INITIAL);
    setThumbImage('');
  };

  const handleVideoDownload = async () => {
    if (screenState === ScreenState.CONFIRM) {
      // Add video download to queue

      addVideo(videoLink, thumbImage);

      navigate('Home');

      return;
    }

    if (!isURL(inputValue)) {
      setError(
        'Ops, o link informado é inválido.\nVerifique e tente novamente',
      );
      return;
    }

    setError(null);
    setScreenState(ScreenState.LOADING);

    try {
      const downloader = new FBDownloader();
      const result = await downloader.fetchMidiaLink(inputValue);

      console.log(result);

      if (result.thumbURL && result.videoURL) {
        setThumbImage(result.thumbURL);
        setVideoLink(result.videoURL);

        setScreenState(ScreenState.CONFIRM);
        return;
      }

      Alert.alert('Ops', 'Não foi possível obter informações desse vídeo.');

      setScreenState(ScreenState.INITIAL);
    } catch (error) {
      console.log(error);
      Alert.alert('Ops', 'Ocorreu um probleminha :(');

      setScreenState(ScreenState.INITIAL);
    }
  };

  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }}>
        <Header>
          <BackButton onPress={goBack}>
            <FeatherIcon name="chevron-left" color="#fff" size={20} />
          </BackButton>
          <HeaderTitleContainer>
            <HeaderTitle>Baixar vídeo</HeaderTitle>
          </HeaderTitleContainer>
        </Header>
        <KeyboardAvoidingView behavior="height">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Content>
              <Title>Como utilizar?</Title>
              <Info>1. Copie o link do vídeo</Info>
              <Info>2. Cole no campo abaixo</Info>
              <Info>3. Clique em baixar</Info>

              <Input
                icon="link"
                placeholderTextColor="#ffffff3c"
                placeholder="Cole o link do vídeo aqui"
                error={!!error}
                style={{ marginTop: 30 }}
                value={inputValue}
                onChangeText={handleVideoLinkChange}
              />

              <ActionContainer>
                {error && <ErrorText>{error}</ErrorText>}
                {/* <ErrorText>
                  Ops, não conseguimos localizar este vídeo :({'\n'}
                  Verifique a URL e tente novamente...
                </ErrorText> */}
                <Button
                  text="Baixar"
                  style={{ marginTop: 20 }}
                  onPress={handleVideoDownload}
                  loading={screenState === ScreenState.LOADING}
                />
              </ActionContainer>
            </Content>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {screenState === ScreenState.CONFIRM && (
        <ModalContainer>
          <Modal>
            <ModalTitle>
              Começar a baixar{'\n'}
              <ModalTitleBar />
            </ModalTitle>
            <ModalContent>
              <VideoThumb
                source={{
                  uri: thumbImage,
                }}
              />
              <VideoTitle>
                Lorem ipsum dor let si teste ipsum dor let si
              </VideoTitle>
              <ActionContainer>
                <Button
                  text="Confirmar"
                  style={{ marginTop: 20 }}
                  onPress={handleVideoDownload}
                />
              </ActionContainer>
              <CancelContainer>
                <TouchableOpacity onPress={handleReset}>
                  <Cancel>Cancelar</Cancel>
                </TouchableOpacity>
              </CancelContainer>
            </ModalContent>
          </Modal>
        </ModalContainer>
      )}
    </Container>
  );
};

export default VideoLink;
