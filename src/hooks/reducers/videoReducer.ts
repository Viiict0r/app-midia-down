import { IVideo } from '../videoManager';

export enum VideoReducerActions {
  UPDATE_VIDEO_DATA = 'update_video_data',
  NEW_VIDEO = 'new_video',
}

interface IAction {
  type: VideoReducerActions;
  payload: IVideo | IVideo[];
}

export const videoReducer = (state: IVideo[], action: IAction): IVideo[] => {
  switch (action.type) {
    case VideoReducerActions.UPDATE_VIDEO_DATA: {
      const video = action.payload as IVideo;
      const index = state.findIndex(vid => vid.id === video.id);

      if (index !== -1) {
        const oldData = [...state];

        oldData[index] = video;

        return oldData;
      }

      return state;
    }
    case VideoReducerActions.NEW_VIDEO:
      return [...state, action.payload as IVideo];
    default:
      return state;
  }
};
