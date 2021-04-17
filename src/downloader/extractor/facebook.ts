/* eslint-disable prefer-destructuring */
import cheerio from 'cheerio';
import { IDownloader } from '../models/IDownloader';

import { VideoData } from '../types';
import { isURL } from '../utils/isURL';

export class Facebook implements IDownloader {
  async extractVideoData(video_url: string): Promise<VideoData> {
    const fb_response = await fetch(video_url, {
      headers: {
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'mode',
        'sec-fetch-site': 'same-origin',
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
      },
    });

    const response = await fb_response.text();

    const $ = cheerio.load(response);

    const thumbURL = $('meta[property="og:image"]').first().attr('content');
    let sd_link;
    let hd_link;

    // Check for sd quality
    if (response.indexOf('sd_src') !== -1) {
      sd_link = response.split('sd_src:')[1].split(',')[0];
      sd_link = JSON.parse(`{"url": ${sd_link}}`).url;
    }

    // Check for hd quality
    if (response.indexOf('hd_src') !== -1) {
      hd_link = response.split('hd_src:')[1].split(',')[0];
      hd_link = JSON.parse(`{"url": ${hd_link}}`).url;
    }

    // Get disponible video version
    if (!sd_link && !hd_link) {
      hd_link = $('meta[property="og:video:url"]').first().attr('content');
    }

    return {
      thumbURL,
      videoURL: {
        hd: hd_link,
        sd: sd_link,
      },
    };
  }

  public validateURL(video_url: string): boolean {
    console.log(video_url);
    if (String(video_url).indexOf('facebook') !== -1) {
      return true;
    }

    return false;
  }
}
