import {AppCountry} from './app-country';
import {AppPassport} from './app-passport';

export interface Item {
  id: number;
  firstname: string;
  lastname: string;
  countryName: string;
  countryId: number;
  passportId: number;
  passportNumber: string;
  position: string;
  age: number;
  boss: number;
}
