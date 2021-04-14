import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, SafeAreaView } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { Video } from '../../components';
import { IVideo, useVideoManager } from '../../hooks/videoManager';

import { AppColors } from '../../styles/colors';

import {
  Container,
  AddVideoButton,
  Gradient,
  HomeTitleContainer,
  HomeTitleText,
  HomeTitleBar,
  EmptyContainer,
  EmptyIcon,
  EmptyText,
} from './styles';

const Index: React.FC = () => {
  const { navigate } = useNavigation();
  const { videos } = useVideoManager();

  const handleAddButtonClick = () => {
    navigate('VideoLink');
  };

  return (
    <Container>
      <SafeAreaView>
        <FlatList
          data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]}
          // data={[]}
          style={{ padding: 10 }}
          ListHeaderComponent={
            <HomeTitleContainer>
              <HomeTitleText>Vídeos baixados</HomeTitleText>
              <HomeTitleBar />
            </HomeTitleContainer>
          }
          ListEmptyComponent={
            <EmptyContainer>
              <EmptyIcon>
                <FeatherIcon
                  name="download"
                  color={AppColors.info}
                  size={150}
                />
              </EmptyIcon>
              <EmptyText>
                Você ainda não baixou nenhum vídeo, clique no botão + para
                baixar
              </EmptyText>
            </EmptyContainer>
          }
          renderItem={item => <Video />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
      <Gradient colors={[AppColors.primary.color_2, AppColors.primary.color_1]}>
        <AddVideoButton onPress={handleAddButtonClick}>
          <FeatherIcon name="plus" size={30} color="#fff" />
        </AddVideoButton>
      </Gradient>
    </Container>
  );
};

export default Index;
