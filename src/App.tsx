import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// import RNBackgroundDownloader from 'react-native-background-downloader';

import { AppRoutes } from './routes/app.routes';
import { AppProvider } from './hooks';

// import { Container } from './styles';

const App: React.FC = () => {
  // useEffect(() => {
  //   // const path = RNBackgroundDownloader.directories.documents;

  //   console.log(RNFS.ExternalDirectoryPath);

  //   // RNFS.readDir(path).then(result => {
  //   //   console.log(result);
  //   // });
  // }, []);

  // const fetchVideo = async () => {
  //   const links = await new FBDownloader().fetchMidiaLink(videoLink);

  //   if (links.thumbURL) {
  //     setThumbUrl(links.thumbURL);
  //   } else {
  //     console.log('Unknow video image');
  //     setThumbUrl(undefined);
  //   }

  //   // console.log(RNBackgroundDownloader.directories.documents);

  //   // const task = RNBackgroundDownloader.download({
  //   //   id: 'teste',
  //   //   url: videoURL,
  //   //   destination: `${RNBackgroundDownloader.directories.documents}/teste2.mp4`,
  //   // })
  //   //   .begin(expectedBytes => {
  //   //     console.log(`Going to download ${expectedBytes / 1000} bytes!`);
  //   //   })
  //   //   .progress(percent => {
  //   //     console.log(`Downloaded: ${percent * 100}%`);
  //   //   })
  //   //   .done(() => {
  //   //     console.log('Download is done!');
  //   //   })
  //   //   .error(error => {
  //   //     console.log('Download canceled due to error: ', error);
  //   //   });
  // };

  return (
    <NavigationContainer>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
