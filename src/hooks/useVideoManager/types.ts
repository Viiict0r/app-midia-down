export enum VideoDownloadStatus {
  COMPLETE = 'COMPLETE',
  PROGRESS = 'PROGRESS',
  FAILURE = 'FAILURE',
  INITIALIZING = 'INITIALIZING',
}

export interface IVideo {
  id: string;
  path: string;
  size?: number;
  thumb: string;
  download: {
    status: VideoDownloadStatus;
    progress: number;
    paused: boolean;
  };
}
