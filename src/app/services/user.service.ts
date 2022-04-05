import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {ResBody} from '../model/res-body';
import {environment} from '../../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly expenseRestUrl = environment.backEndUrl + '/api/vi/person';
  private readonly signupPath = this.expenseRestUrl + '/account';
  private readonly loginPath = this.expenseRestUrl + '/account/token';

  constructor(private httpClient: HttpClient, private cookieService: CookieService, private router: Router) {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  getHeaders(): object {
    if (!this.cookieService.check('token') || this.getToken().length < 20) {
      this.router.navigate(['/login']);
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Method': 'GET, POST, PUT, DELETE',
        Authorization: 'Bearer ' + this.getToken()
      })
    }
    return httpOptions;
  }

  getAuth(username: string, password: string): Observable<HttpResponse<ResBody>> {
    return this.httpClient.get<ResBody>(this.expenseRestUrl + environment.loginPath +
        `?username=` + username + `&password=` + password, {observe: 'response'})
  }
  
  getToken(): string {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
    } 
    return this.cookieService.get('token');
  }
  
  isLoggedIn(): boolean {
    return this.cookieService.check('token');
  }  
}
