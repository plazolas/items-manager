import {AppLifespan} from './app-lifespan';
export interface Source {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  country: string;
  'life-span': AppLifespan;
}
