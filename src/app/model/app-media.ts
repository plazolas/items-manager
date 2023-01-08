import {AppTrack} from './app-track';

export interface AppMedia {
  'format-id': string;
  title: string;
  format: string;
  'track-count': number;
  position: number;
  tracks: AppTrack[]
}
