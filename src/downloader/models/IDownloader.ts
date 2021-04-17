import { VideoData } from '../types';

export interface IDownloader {
  extractVideoData(video_url: string): Promise<VideoData>;
  validateURL(video_url: string): boolean;
}
