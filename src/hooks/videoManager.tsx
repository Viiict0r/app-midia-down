/* eslint-disable @typescript-eslint/no-use-before-define */

// @refresh reset
import React, {
  createContext,
  useContext,
  useState,
  useReducer,
  useRef,
  useEffect,
  useCallback,
} from 'react';

import RNBackgroundDownloader, {
  DownloadTask,
} from 'react-native-background-downloader';

import AsyncStorage from '@react-native-community/async-storage';
import RNFS from 'react-native-fs';

import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

import { videoReducer, VideoReducerActions } from './reducers/videoReducer';

import { AppError } from '../errors/AppError';

interface IVideoDownloadStats {
  completed: boolean;
  progress: number;
  paused: boolean;
}

export interface IVideo {
  id: string;
  queued: boolean;
  path: string;
  size?: number;
  thumb: string;
  download: IVideoDownloadStats;
  error: boolean;
}

export enum ManagerStatus {
  READY = 'ready',
  LOADING = 'loading',
}

interface IVideoManagerContext {
  videos: IVideo[];
  status: ManagerStatus;
  addVideo(video_url: string, thumb_url: string): void;
  deleteVideo(video: IVideo): void;
}

const VideoManagerContext = createContext<IVideoManagerContext>(
  {} as IVideoManagerContext,
);

export const VideoManagerProvider: React.FC = ({ children }) => {
  const [videos, dispatch] = useReducer(videoReducer, [] as IVideo[]);
  const [status, setStatus] = useState(ManagerStatus.LOADING);

  const handleTask = async (task: DownloadTask, video: IVideo) => {
    task
      .begin(size => {
        console.log('[begin]:', size);

        // Update video size
        video.size = size;

        dispatch({
          type: VideoReducerActions.UPDATE_VIDEO_DATA,
          payload: video,
        });
      })
      .progress(percent => {
        console.log('[progress]:', percent);

        video.download.progress = percent * 100;

        dispatch({
          type: VideoReducerActions.UPDATE_VIDEO_DATA,
          payload: video,
        });
      })
      .done(() => {
        video.download.completed = true;
        video.download.paused = false;
        video.download.progress = 100;

        console.log('Done.');

        dispatch({
          type: VideoReducerActions.UPDATE_VIDEO_DATA,
          payload: video,
        });
        // Show success toast
      })
      .error(error => {
        // Show error toast
        console.log('[error]: ', error);

        video.error = true;

        dispatch({
          type: VideoReducerActions.UPDATE_VIDEO_DATA,
          payload: video,
        });
      });
  };

  const addVideo = async (video_url: string, video_thumb: string) => {
    const filePath = RNFS.ExternalDirectoryPath;
    const videoId = `MD-${uuid().replace('-', '')}`;
    const videoPath = `${filePath}/${videoId}.mp4`;

    const videoObj: IVideo = {
      id: videoId,
      queued: true,
      thumb: video_thumb,
      path: videoPath,
      error: false,
      download: {
        completed: false,
        paused: false,
        progress: 0,
      },
    };

    dispatch({ type: VideoReducerActions.NEW_VIDEO, payload: videoObj });

    console.log('Procurando tamanho do video...');

    const response = await fetch(video_url, {
      headers: {
        'sec-fetch-dest': 'document',
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
      },
    });

    const contentLength = response.headers.get('content-length');

    console.log('-------------');
    console.log('Video content length: ', contentLength);

    const task = RNBackgroundDownloader.download({
      id: videoId,
      url: video_url,
      destination: videoPath,
      headers: {
        Range: `0-${contentLength}`,
      },
    });

    handleTask(task, videoObj);
  };

  const deleteVideo = () => {
    // Do stuff...
  };

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
