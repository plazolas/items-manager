import {AppRelease} from './app-release';

export interface AppReleasesList {
  id: string;
  name: string;
  gender: string;
  releases: AppRelease[];
}
