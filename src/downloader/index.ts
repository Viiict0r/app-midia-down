import { Facebook } from './extractor/facebook';
import { IDownloader } from './models/IDownloader';
import { SocialNetworkTypes, VideoData } from './types';

export class Downloader {
  constructor(private socialType: SocialNetworkTypes) {}

  public validateURL(video_url: string): boolean {
    const extractor = this.getExtractorInstance();

    if (!extractor) {
      return false;
    }

    return extractor?.validateURL(video_url);
  }

  public async extractVideoData(video_url: string): Promise<VideoData> {
    const extractor = this.getExtractorInstance();

    if (!extractor) {
      throw new Error('Erro ao obter informações desse video.');
    }

    const videoData = await extractor.extractVideoData(video_url);

    return videoData;
  }

  private getExtractorInstance(): IDownloader | undefined {
    switch (this.socialType) {
      case SocialNetworkTypes.FACEBOOK:
        return new Facebook();
      default:
        return undefined;
    }
  }
}
