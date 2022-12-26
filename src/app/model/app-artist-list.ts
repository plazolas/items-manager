import {AppArtist} from './app-artist';
export interface AppArtistList {
  created: string;
  count: string;
  offset: number;
  artists: AppArtist[];
}
