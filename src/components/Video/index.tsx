import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import FAIcon from 'react-native-vector-icons/FontAwesome';

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

export const Video: React.FC = () => {
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
            uri:
              'https://scontent.ffln1-1.fna.fbcdn.net/v/t15.5256-10/p206x206/74666062_527880641100872_1704539727983542272_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=ad6a45&_nc_ohc=TcbVucNCUmcAX-gB_Ut&_nc_oc=AQkwBCrPMCHypZOK7qsBtzA0NaXjwoU5-bBi_n1gGj3aiLOq0isqdILeRZjS2VwMnwHOhXpGQfleSWqjTn9bcP1E&_nc_ht=scontent.ffln1-1.fna&tp=6&oh=c8b6efd588e05e1075865de0b3602e92&oe=609D1068',
          }}
          style={{ resizeMode: 'cover' }}
        />
      </ThumbnailContainer>
      <VideoInfo>
        <VideoTitle>Lorem ipsum dor let sir</VideoTitle>
        <VideoSocialType>Facebook video</VideoSocialType>
        <VideoProgress>
          23.5mb / 55.3mb -{' '}
          <VideoProgressStatus>75% baixados</VideoProgressStatus>
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
