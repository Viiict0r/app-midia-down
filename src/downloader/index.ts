export enum SocialType {
  FACEBOOK = 'fb',
  INSTAGRAM = 'ig',
  TWITTER = 'tw',
  REDDIT = 'rd',
}

export class Downloader {
  constructor(private socialType: SocialType) {}

  // Read downloaded files, download new files and share downloads progress
}
