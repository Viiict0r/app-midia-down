export enum SocialNetworkTypes {
  FACEBOOK = 'FACEBOOK',
  TWITTER = 'TWITTER',
  INSTAGRAM = 'INSTAGRAM',
  REDDIT = 'REDDIT',
}

export interface VideoQuality {
  hd: string | undefined;
  sd: string | undefined;
}

export interface VideoData {
  videoURL: VideoQuality;
  thumbURL: string | undefined;
}
