import {AppCountry} from './app-country';
import {AppPassport} from './app-passport';

export interface Item {
  id: number;
  firstname: string;
  lastname: string;
  country: AppCountry;
  passport: AppPassport;
  position: string;
  age: number;
  boss: number;
}
