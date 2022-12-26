import {AppLifespan} from './app-lifespan';
export interface AppArtist {
  id: string;
  type: string;
  score: number;
  name: string;
  gender: string;
  country: string;
  sortName: string;
  disambiguation: string;
  'sort-name': string;
  'type-id': string;
  'life-span': AppLifespan;
  area: AppArtist;
  'begin-area': AppArtist;

}
