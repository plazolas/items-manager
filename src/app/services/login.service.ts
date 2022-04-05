import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {ResBody} from '../model/res-body';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly expenseRestUrl = environment.backEndUrl + '/api/vi/person';
  private readonly signupPath = this.expenseRestUrl + '/account';

  constructor(private http: HttpClient) { }
  

  public signup(username: string, password: string): Observable<ResBody> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const options = { headers };
    return this.http.post<ResBody>( this.signupPath, `username=${username}&password=${password}`, options);
  }

  public authenticate(username: string, password: string): Observable<ResBody> {
    const loginPath = this.expenseRestUrl + '/account/token';
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const options = { headers };
    return this.http.get<ResBody>(loginPath + `?username=${username}&password=${password}`, options);
  }
}
