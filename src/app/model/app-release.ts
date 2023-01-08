import {AppMedia} from './app-media';

export interface AppRelease {
  id: string;
  status: string;
  title: string;
  country: string;
  barcode: string;
  packaging: string;
  date: string;
  media: AppMedia[];
}
