// @refresh reset

import React, { useMemo, useState, useRef, useCallback } from 'react';

import {
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  FlatList,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize';
import { TouchableOpacity } from 'react-native-gesture-handler';

import FeatherIcon from 'react-native-vector-icons/Feather';
import FAIcon from 'react-native-vector-icons/FontAwesome5';

import { Input, Button } from '../../components';
import { ConfirmModal } from './ConfirmModal';
import { isURL } from '../../downloader/utils/isURL';
import { Downloader } from '../../downloader';
import { SocialNetworkTypes, VideoData } from '../../downloader/types';
import { useVideoManager } from '../../hooks/useVideoManager';
import {
  useQualitySelection,
  VideoQuality,
} from '../../hooks/useQualitySelection';
import { SocialNetworkOption } from './types';

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
  SocialContainer,
  SocialIcon,
  SocialText,
  SocialBlock,
  SocialNetworkList,
} from './styles';

enum ScreenState {
  LOADING = 'loading', // Fetching video
  CONFIRM = 'confirm', // Confirm and download video
  INITIAL = 'initial',
}

// const TEST_VIDEO_LINK =
//   'https://pt-br.facebook.com/melhoresvideosmv/videos/638695059484112/';

const VideoLink: React.FC = () => {
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [screenState, setScreenState] = useState<ScreenState>(
    ScreenState.INITIAL,
  );
  const [
    selectedSocialNetwork,
    setSelectedSocialNetwork,
  ] = useState<SocialNetworkOption | null>(null);

  const { addVideo } = useVideoManager();
  const { currentSelectedQuality } = useQualitySelection();
  const { navigate, goBack } = useNavigation();

  const flatlistRef = useRef<FlatList>(null);
  const modalRef = useRef<Modalize>(null);

  const handleVideoLinkChange = (link: string) => {
    setError(null);
    setInputValue(link);
  };

  const handleReset = () => {
    setInputValue('');
    setScreenState(ScreenState.INITIAL);
    setVideoData(null);
    setError(null);
  };

  const handleSocialNetworkSelect = useCallback(
    (socialNetwork: SocialNetworkOption) => {
      handleReset();

      setSelectedSocialNetwork(socialNetwork);
    },
    [],
  );

  const handleVideoDownload = async () => {
    Keyboard.dismiss();

    if (!selectedSocialNetwork) {
      Alert.alert('Erro', 'Selecione a rede social para continuar');
      return;
    }

    if (!inputValue || !inputValue.length) {
      setError(
        'Você deve informar o link do video no\ncampo acima para continuar',
      );
      return;
    }

    if (!isURL(inputValue)) {
      setError(
        'Ops, o link informado é inválido.\nVerifique e tente novamente',
      );
      return;
    }

    const downloader = new Downloader(selectedSocialNetwork.type);

    if (!downloader.validateURL(inputValue)) {
      setError('O link informado é inválido para esse tipo de rede social.');
      return;
    }

    setError(null);
    setScreenState(ScreenState.LOADING);

    try {
      const videoData = await downloader.extractVideoData(inputValue);

      console.log(videoData);

      if (
        videoData.thumbURL &&
        (videoData.videoURL.hd || videoData.videoURL.sd)
      ) {
        setVideoData(videoData);

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

  const handleConfirm = () => {
    let videoLink = null;

    switch (currentSelectedQuality) {
      case VideoQuality.HD:
        videoLink = videoData?.videoURL.hd;
        break;
      case VideoQuality.SD:
        videoLink = videoData?.videoURL.sd;
        break;
      default:
        videoLink = null;
        break;
    }

    if (!videoLink) {
      Alert.alert('Erro', 'Selecione a qualidade do video');
      return;
    }

    if (!videoData?.thumbURL) return;

    addVideo(videoLink, videoData.thumbURL);

    modalRef.current?.close();

    navigate('Home');
  };

  const socialNetworkOptions = useMemo<SocialNetworkOption[]>(() => {
    return [
      {
        text: 'Facebook',
        icon_name: 'facebook-f',
        type: SocialNetworkTypes.FACEBOOK,
      },
      {
        text: 'Twitter',
        icon_name: 'twitter',
        type: SocialNetworkTypes.TWITTER,
      },
      {
        text: 'Instagram',
        icon_name: 'instagram',
        type: SocialNetworkTypes.INSTAGRAM,
      },
      {
        text: 'Reddit',
        icon_name: 'reddit-alien',
        type: SocialNetworkTypes.REDDIT,
      },
    ];
  }, []);

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
          <Content>
            <Title>Como utilizar?</Title>
            <Info>1. Copie o link do vídeo</Info>
            <Info>2. Selecione a rede social desejada</Info>
            <Info>3. Cole o link de download no campo</Info>
            <Info>4. Clique em baixar</Info>

            <SocialBlock>
              <Title>De onde você deseja baixar?</Title>

              <SocialNetworkList
                horizontal
                data={socialNetworkOptions}
                ref={flatlistRef}
                showsHorizontalScrollIndicator={false}
                renderItem={item => (
                  <TouchableOpacity
                    onPress={() => handleSocialNetworkSelect(item.item)}
                    activeOpacity={0.6}
                  >
                    <SocialContainer
                      selected={item.item.text === selectedSocialNetwork?.text}
                    >
                      <SocialIcon>
                        <FAIcon
                          name={item.item.icon_name}
                          size={30}
                          color="#fff"
                        />
                      </SocialIcon>
                      <SocialText>{item.item.text}</SocialText>
                    </SocialContainer>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.text}
              />
            </SocialBlock>

            <Input
              icon="link"
              placeholderTextColor="#ffffff3c"
              placeholder="Cole o link do video aqui"
              error={!!error}
              style={{ marginTop: 30 }}
              value={inputValue}
              editable={screenState === ScreenState.INITIAL}
              onChangeText={handleVideoLinkChange}
            />

            <ActionContainer>
              {error && <ErrorText>{error}</ErrorText>}

              <Button
                text="Baixar"
                style={{ marginTop: 20 }}
                onPress={handleVideoDownload}
                loading={screenState === ScreenState.LOADING}
              />
            </ActionContainer>
          </Content>
        </KeyboardAvoidingView>
      </SafeAreaView>

      <ConfirmModal
        modalizeRef={modalRef}
        onConfirm={handleConfirm}
        videoData={videoData}
      />
    </Container>
  );
};

export default VideoLink;
