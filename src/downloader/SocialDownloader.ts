export interface VideoLink {
  videoURL: string | undefined;
  thumbURL: string | undefined;
}
export interface SocialDownloader {
  fetchMidiaLink(video_url: string): Promise<VideoLink | undefined>;
}
