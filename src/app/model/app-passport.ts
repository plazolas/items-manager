import {AppCountry} from "./app-country";

export interface AppPassport {
  id: number;
  number: string;
  expDate: string;
  country: AppCountry
}
