import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {ResBody} from '../model/res-body';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly itemRestUrl = environment.backEndUrl + '/api/vi/person';
  private readonly signupPath = this.itemRestUrl + '/account';
  private readonly loginPath = this.itemRestUrl + '/account/token';

  constructor(private http: HttpClient) { }

  public signup(username: string, password: string, useremail: string, phone: string): Observable<ResBody> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Method': 'GET'
    });
    const options = { headers };
    return this.http.post<ResBody>( this.signupPath,
        `username=${username}&password=${password}&useremail=${useremail}&phone=${phone}`, options);
  }

  public authenticate(username: string, password: string): Observable<ResBody> {
    const loginPath = this.loginPath;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Method': 'GET'
    });
    const options = { headers };
    return this.http.get<ResBody>(loginPath + `?username=${username}&password=${password}`, options);
  }
}
