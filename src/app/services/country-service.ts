import {Injectable} from '@angular/core';
import {Item} from '../model/item';
import {AppCountry} from '../model/app-country';

import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {UserService} from './user.service';


@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private readonly itemsRestUrl = environment.backEndUrl + '/api/vi/country';
  private endPointUrl = environment.backEndUrl;
  private token = '';
  private httpOptions = {};
  public lastId = 0;
  public searchedItems: string[] = [];
  public data: any;

  constructor(private httpClient: HttpClient, private cookieService: CookieService, private router: Router,
              private userService: UserService) {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']).then();
    }
    this.token = this.userService.getToken();
    this.httpOptions = userService.getHeaders();
  }

  getCountries(): Observable<object> {
    return this.httpClient.get<object>(this.itemsRestUrl, this.httpOptions)
        .pipe(
            retry(3),
            catchError(this.httpErrorHandler)
        );
  }

  getCountry(id: number): Observable<object> {
    const res = this.httpClient.get(this.itemsRestUrl + '/' + id, this.httpOptions);
    return res
        .pipe(
            retry(3),
            catchError(this.httpErrorHandler)
        );
  }

  private httpErrorHandler(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = 'A client side error occurs. The error message is ' + error.message;
    } else {
      msg = 'An error happened in server. The HTTP status code is ' + error.status + ' and the error returned is ' + error.message;
    }
    return throwError( msg );
  }

}
