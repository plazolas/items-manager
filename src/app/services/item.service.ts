import {Injectable} from '@angular/core';
import {Item} from '../model/item';

import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {UserService} from './user.service';

@Injectable()
export class ItemService {
    private readonly itemsRestUrl = environment.backEndUrl + '/api/vi/person';
    private endPointUrl = environment.backEndUrl;
    private token = '';
    private readonly httpOptions = {};
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
    
    getLastIdObs(): Observable<number> {
        return this.httpClient.get<number>(this.itemsRestUrl + '/findlast', this.httpOptions)
            .pipe(
                retry(3),
                catchError(this.httpErrorHandler)
            );
    }

    getLastIdNumber(): Observable<number> {
        return this.httpClient.get<number>(this.itemsRestUrl + '/findlast', this.httpOptions)
            .pipe(
                retry(3),
                catchError(this.httpErrorHandler)
            );
    }

    getItems(): Observable<object> {
        return this.httpClient.get(this.itemsRestUrl, this.httpOptions)
            .pipe(
                retry(3),
                catchError(this.httpErrorHandler)
            );
    }

    getItem(id: number): Observable<object> {
        const res = this.httpClient.get(this.itemsRestUrl + '/' + id, this.userService.getHeadersForResponse());
        return res
            .pipe(
                retry(3),
                catchError(this.httpErrorHandler)
            );
    }

    addItem(item: Item): Observable<Item> {
        return this.httpClient.post<Item>(this.itemsRestUrl, item, this.httpOptions)
            .pipe(
                retry(3),
                catchError(this.httpErrorHandler)
            );
    }

    updateItem(item: Item): Observable<Item> {
        return this.httpClient.put<Item>(this.itemsRestUrl + '/' + item.id, item, this.httpOptions)
            .pipe(
                retry(3),
                catchError(this.httpErrorHandler)
            );
    }

    deleteItem(item: Item | number): Observable<Item> {
        const id = typeof item === 'number' ? item : item.id;
        const url = `${this.itemsRestUrl}/${id}`;

        return this.httpClient.delete<Item>(url, this.httpOptions)
            .pipe(
                retry(3),
                catchError(this.httpErrorHandler)
            );
    }

    getItemsBySearchTerm(term: string): string[] {
        term = term.replace(' ', '+')
        this.httpClient.get(this.itemsRestUrl + '/search/' + term, this.httpOptions)
            .subscribe({
                next: data => { this.data = data },
                error: err => { return this.httpErrorHandler(err) }
            });
        return this.data;
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
