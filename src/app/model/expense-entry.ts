import {AppCountry} from "./app-country";
import {AppPassport} from "./app-passport";

export interface ExpenseEntry {
  id: number;
  country: AppCountry;
  passport: AppPassport;
  firstname: string;
  lastname: string;
}
