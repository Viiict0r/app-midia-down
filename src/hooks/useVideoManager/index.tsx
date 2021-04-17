/* eslint-disable @typescript-eslint/no-use-before-define */

// @refresh reset
import React, {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
  useCallback,
  useRef,
} from 'react';

import RNBackgroundDownloader, {
  DownloadTask,
} from 'react-native-background-downloader';

import AsyncStorage from '@react-native-community/async-storage';
import RNFS from 'react-native-fs';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

import { IVideo, VideoDownloadStatus } from './types';
import { videoReducer, VideoReducerActions } from './reducer';

export enum ManagerStatus {
  READY = 'ready',
  LOADING = 'loading',
}

interface IVideoManagerContext {
  videos: IVideo[];
  status: ManagerStatus;
  addVideo(video_url: string, thumb_url: string, video_title: string): void;
  deleteVideo(video: IVideo): void;
}

const VideoManagerContext = createContext<IVideoManagerContext>(
  {} as IVideoManagerContext,
);

export const VideoManagerProvider: React.FC = ({ children }) => {
  const [videos, dispatch] = useReducer(videoReducer, [] as IVideo[]);
  const [status, setStatus] = useState(ManagerStatus.LOADING);

  const firstLoad = useRef(false);

  const saveLocalData = useCallback(async data => {
    await AsyncStorage.setItem('@midiaDown:data', JSON.stringify(data));
  }, []);

  const handleTask = useCallback(
    async (task: DownloadTask, video: IVideo) => {
      task
        .begin(size => {
          console.log('[begin]:', size);

          // Update video size
          video.size = size;
          video.download.status = VideoDownloadStatus.PROGRESS;

          dispatch({
            type: VideoReducerActions.UPDATE_VIDEO_DATA,
            payload: video,
            onStateChange: saveLocalData,
          });
        })
        .progress(percent => {
          console.log('[progress]:', percent);

          video.download.progress = percent;

          dispatch({
            type: VideoReducerActions.UPDATE_VIDEO_DATA,
            payload: video,
          });
        })
        .done(() => {
          video.download.status = VideoDownloadStatus.COMPLETE;
          video.download.paused = false;
          video.download.progress = 1;

          console.log('Done.');

          dispatch({
            type: VideoReducerActions.UPDATE_VIDEO_DATA,
            payload: video,
            onStateChange: saveLocalData,
          });
          // Show success toast
        })
        .error(error => {
          // Show error toast
          console.log('[error]: ', error);

          video.download.status = VideoDownloadStatus.FAILURE;

          dispatch({
            type: VideoReducerActions.UPDATE_VIDEO_DATA,
            payload: video,
            onStateChange: saveLocalData,
          });
        });
    },
    [saveLocalData],
  );

  const addVideo = async (
    video_url: string,
    video_thumb: string,
    video_title: string,
  ) => {
    const filePath = RNFS.ExternalDirectoryPath;
    const videoId = `MD-${uuid()}`;
    const videoPath = `${filePath}/${videoId}.mp4`;

    const videoObj: IVideo = {
      id: videoId,
      thumb: video_thumb,
      path: videoPath,
      title: video_title,
      download: {
        status: VideoDownloadStatus.INITIALIZING,
        paused: false,
        progress: 0,
      },
    };

    dispatch({
      type: VideoReducerActions.NEW_VIDEO,
      payload: videoObj,
      onStateChange: saveLocalData,
    });

    // const response = await fetch(video_url, {
    //   headers: {
    //     'sec-fetch-dest': 'document',
    //     'User-Agent':
    //       'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
    //   },
    // });

    // const contentLength = response.headers.get('content-length');

    // console.log('-------------');
    // console.log('Video content length: ', contentLength);

    const task = RNBackgroundDownloader.download({
      id: videoId,
      url: video_url,
      destination: videoPath,
      // headers: {
      //   Range: `0-${contentLength}`,
      // },
    });

    handleTask(task, videoObj);
  };

  const deleteVideo = () => {
    // Do stuff...
  };

  const readLocalData = async (): Promise<IVideo[]> => {
    const localData = await AsyncStorage.getItem('@midiaDown:data');

    if (!localData) {
      return [];
    }

    return JSON.parse(localData) as IVideo[];
  };

  const checkPendingDownloads = useCallback(
    async videos => {
      const pendingTasks = await RNBackgroundDownloader.checkForExistingDownloads();

      if (pendingTasks && pendingTasks.length) {
        pendingTasks.forEach(task => {
          const taskId = task.id;
          const video = videos.find(
            (v: IVideo) => String(v.id) === String(taskId),
          );

          if (!video) return;

          handleTask(task, video);
        });
      }
    },
    [handleTask],
  );

  const loadVideos = useCallback(async () => {
    const deviceData = await readLocalData();

    console.log(deviceData);

    dispatch({
      type: VideoReducerActions.SET_DATA,
      payload: deviceData,
      onStateChange: checkPendingDownloads,
    });
  }, [checkPendingDownloads]);

  useEffect(() => {
    if (firstLoad.current) {
      return;
    }

    firstLoad.current = true;

    loadVideos();
  }, [loadVideos, checkPendingDownloads]);

  return (
    <VideoManagerContext.Provider
      value={{ videos, addVideo, status, deleteVideo }}
    >
      {children}
    </VideoManagerContext.Provider>
  );
};

export const useVideoManager = (): IVideoManagerContext => {
  const context = useContext(VideoManagerContext);

  if (!context) {
    throw new Error(
      'useVideoManager must be used within an VideoManagerProvider',
    );
  }

  return context;
};
