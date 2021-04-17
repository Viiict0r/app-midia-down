import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { AppColors } from '../../../styles/colors';

import { Button, Checkbox } from '../../../components';
import { VideoData } from '../../../downloader/types';

import {
  useQualitySelection,
  VideoQuality,
} from '../../../hooks/useQualitySelection';

import {
  Container,
  Title,
  TitleBar,
  VideoThumb,
  Content,
  VideoTitle,
  ButtonContainer,
  CheckboxContainer,
} from './styles';
import { isURL } from '../../../downloader/utils/isURL';

interface ConfirmModalProps {
  modalizeRef: React.RefObject<Modalize>;
  videoData: VideoData | null;
  onConfirm: () => void;
}

const tempURL =
  'https://scontent.ffln1-1.fna.fbcdn.net/v/t15.5256-10/p206x206/70793364_2436839113081643_1833950644549976064_n.jpg?_nc_cat=1&ccb=1-3&_nc_sid=ad6a45&_nc_ohc=3PFR9xviy6AAX99-so6&_nc_ht=scontent.ffln1-1.fna&tp=6&oh=fef13597426f45c41a5e168342de393a&oe=609FFDE1';

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  modalizeRef,
  onConfirm,
  videoData,
}) => {
  const { selectQuality, currentSelectedQuality } = useQualitySelection();

  const handleQualityClick = (quality: VideoQuality) => {
    selectQuality(quality);
  };

  const handleCofirm = () => {
    onConfirm();
  };

  useEffect(() => {
    if (videoData) {
      selectQuality(null);
      modalizeRef.current?.open();
    }
  }, [videoData, modalizeRef, selectQuality]);

  return (
    <Modalize ref={modalizeRef} modalStyle={styles.modalStyle}>
      <Container>
        <Title>Selecione a qualidade</Title>
        <TitleBar />

        <Content>
          <VideoThumb
            source={{ uri: videoData?.thumbURL || tempURL }}
            style={styles.videoThumb}
          />
          <VideoTitle>{videoData?.title || '< Vídeo sem título >'}</VideoTitle>

          <CheckboxContainer>
            <Checkbox
              label="SD"
              selected={currentSelectedQuality === 'SD'}
              onPress={() => handleQualityClick(VideoQuality.SD)}
              disabled={
                !videoData?.videoURL.sd || !isURL(videoData.videoURL.sd)
              }
            />
            <Checkbox
              label="HD"
              selected={currentSelectedQuality === 'HD'}
              onPress={() => handleQualityClick(VideoQuality.HD)}
              disabled={
                !videoData?.videoURL.hd || !isURL(videoData.videoURL.hd)
              }
            />
          </CheckboxContainer>

          <ButtonContainer>
            <Button text="Confirmar" onPress={handleCofirm} />
          </ButtonContainer>
        </Content>
      </Container>
    </Modalize>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: AppColors.background.color_1,
  },
  videoThumb: {
    resizeMode: 'contain',
  },
});
