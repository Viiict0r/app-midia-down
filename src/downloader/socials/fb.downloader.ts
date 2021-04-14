import cheerio from 'cheerio';

import { SocialDownloader, VideoLink } from '../SocialDownloader';

export class FBDownloader implements SocialDownloader {
  async fetchMidiaLink(video_url: string): Promise<VideoLink> {
    const fb_response = await fetch(video_url, {
      headers: {
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'mode',
        'sec-fetch-site': 'same-origin',
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
      },
    });

    const $ = cheerio.load(await fb_response.text());

    const thumbURL = $('meta[property="og:image"]').first().attr('content');
    const videoURL = $('meta[property="og:video:url"]').first().attr('content');

    return {
      thumbURL,
      videoURL: `${videoURL}&dl=1`,
    };
  }
}
