export interface VideoQuality {
  hd: string | undefined;
  sd: string | undefined;
}

export interface VideoLink {
  videoURL: VideoQuality;
  thumbURL: string | undefined;
}
export interface SocialDownloader {
  fetchMidiaLink(video_url: string): Promise<VideoLink | undefined>;
}
