import {Injectable} from '@angular/core';

import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {UserService} from './user.service';
import {CommonUtils} from '../utils/commonUtils';


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

  constructor(private httpClient: HttpClient, private router: Router,
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
            catchError(err => { return CommonUtils.httpErrorHandler(err) })
        );
  }

  getCountry(id: number): Observable<object> {
    const res = this.httpClient.get(this.itemsRestUrl + '/' + id, this.httpOptions);
    return res
        .pipe(
            retry(3),
            catchError(err => { return CommonUtils.httpErrorHandler(err) })
        );
  }

}
