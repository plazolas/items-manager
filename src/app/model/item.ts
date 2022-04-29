import {AppCountry} from './app-country';
import {AppPassport} from './app-passport';

export interface Item {
  id: number;
  country: AppCountry;
  passport: AppPassport;
  firstname: string;
  lastname: string;
  position: string;
}
