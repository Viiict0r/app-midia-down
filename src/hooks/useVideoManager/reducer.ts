/* eslint-disable @typescript-eslint/no-explicit-any */
import { IVideo } from './types';

export enum VideoReducerActions {
  UPDATE_VIDEO_DATA = 'update_video_data',
  NEW_VIDEO = 'new_video',
  SET_DATA = 'set_data',
}

interface IAction {
  type: VideoReducerActions;
  payload: IVideo | IVideo[];
  onStateChange?: (newState: IVideo[]) => any;
}

export const videoReducer = (state: IVideo[], action: IAction): IVideo[] => {
  switch (action.type) {
    case VideoReducerActions.UPDATE_VIDEO_DATA: {
      const video = action.payload as IVideo;
      const index = state.findIndex(vid => vid.id === video.id);

      if (index !== -1) {
        const oldData = [...state];

        oldData[index] = video;

        if (action.onStateChange) {
          action.onStateChange(oldData);
        }

        return oldData;
      }

      return state;
    }

    case VideoReducerActions.NEW_VIDEO:
      const newVideoData = [action.payload as IVideo, ...state];

      if (action.onStateChange) {
        action.onStateChange(newVideoData);
      }

      return newVideoData;

    case VideoReducerActions.SET_DATA:
      const newState = [...(action.payload as IVideo[])];

      if (action.onStateChange) {
        action.onStateChange(newState);
      }

      return [...(action.payload as IVideo[])];
    default:
      return state;
  }
};
