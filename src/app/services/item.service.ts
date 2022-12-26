import {Injectable} from '@angular/core';
import {Item} from '../model/item';

import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse, HttpEventType} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {UserService} from './user.service';

@Injectable()
export class ItemService {
    public readonly itemsRestUrl = environment.backEndUrl + '/api/vi/person';
    private token = '';
    public readonly httpOptions = {};
    public lastId = 0;
    public searchedItems: string[] = [];
    public data: any;

    constructor(private httpClient: HttpClient, private cookieService: CookieService, private router: Router,
                private userService: UserService) {
        if (!this.userService.isLoggedIn()) {
            this.router.navigate(['/home']).then();
        }
        this.token = this.userService.getToken();
        this.httpOptions = userService.getHeaders();
    }

    fetchLastId(): Promise<any> {
        return fetch(this.itemsRestUrl + '/findlast', this.getHeadersForFetch())
            .then(response => {
                return response.json();
            })
            // .then(data => { console.log(data); });
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

    updateItem(item: Item): Item {
        this.httpClient.put<Item>(this.itemsRestUrl + '/p/' + item.id, item, this.httpOptions)
            .subscribe({
                next: data => { item = data as Item },
                error: httpErrorResponse => { 
                    console.log(httpErrorResponse); 
                    this.httpErrorHandler(httpErrorResponse);
                    const msg = httpErrorResponse.error;
                    throwError(msg);
                },
                complete: () => {}
            });
        return  item;
    }

    updateItemObs(item: Item): Observable<Item> {
        return this.httpClient.put<Item>(this.itemsRestUrl + '/p/' + item.id, item, this.httpOptions)
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
                error: httpErrorResponse => { return this.httpErrorHandler(httpErrorResponse) }
            });
        return this.data;
    }

    private httpErrorHandler(error: HttpErrorResponse) {
        let msg = '';
        if (error.error instanceof ErrorEvent) {
            msg = 'A client side error occurs. The error message is ' + error.message;
        } else if (error instanceof HttpErrorResponse) {
            const status: number = error.status;
            const message: string = error.statusText;
            const type: HttpEventType = error.type;

            msg = 'An error happened in server. The HTTP status code is ' + status +
                '\n message:  ' + message +
                '\n type: ' + type +
                '\n body: '  + 'body'
            // }
        } else {
            msg = 'An error happened in server.';
        }
        return throwError( msg );
    }

    getHeadersForFetch(): object {
        const httpOptionsFetch = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Method': 'GET, POST, PUT, DELETE',
                Authorization: 'Bearer ' + this.userService.getToken()
            },
            observe: 'body',
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer' // origin, origin-when-cross-origin, same-origin, strict-origin,        
        }
        return httpOptionsFetch;
    }


}
