import {Injectable} from '@angular/core';
import {Item} from '../model/item';

import {isEmpty, Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse, HttpEventType} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {UserService} from './user.service';
import {CommonUtils} from '../utils/commonUtils';

@Injectable()
export class ItemService {
    public readonly itemsRestUrl = environment.backEndUrl + '/api/vi/person';
    public readonly httpOptions = {};
    public lastId = 0;
    public searchedItems: string[] = [];
    public data: any;

    constructor(private httpClient: HttpClient, private router: Router,
                private userService: UserService) {
        if (!this.userService.isLoggedIn()) {
            this.router.navigate(['/home']).then();
        }
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
                catchError(err => { return CommonUtils.httpErrorHandler(err) })
            );
    }

    getItem(id: number): Observable<object> {
        const res = this.httpClient.get(this.itemsRestUrl + '/' + id, this.userService.getHeadersForResponse());
        return res
            .pipe(
                retry(3),
                catchError(err => { return CommonUtils.httpErrorHandler(err) })
            );
    }

    addItem(item: Item): Observable<Item> {
        return this.httpClient.post<Item>(this.itemsRestUrl, item, this.httpOptions)
            .pipe(
                retry(3),
                catchError(err => { return CommonUtils.httpErrorHandler(err) })
            );
    }

    updateItem(item: Item): Item {
        this.httpClient.put<Item>(this.itemsRestUrl + '/update/' + item.id, item, this.httpOptions)
            .subscribe({
                next: data => {
                    item = data as Item
                },
                error: httpErrorResponse => {
                    console.log(httpErrorResponse);
                    CommonUtils.httpErrorHandler(httpErrorResponse);
                    const msg = httpErrorResponse.error;
                    throwError(msg);
                },
                complete: () => {}
            });
        return item;
    }

    updateItemObs(item: Item): Observable<Item> {
        return this.httpClient.put<Item>(this.itemsRestUrl + '/update/' + item.id, item, this.httpOptions)
    }

    deleteItem(item: Item | number): Observable<Item> {
        const id = typeof item === 'number' ? item : item.id;
        const url = `${this.itemsRestUrl}/${id}`;

        return this.httpClient.delete<Item>(url, this.httpOptions)
            .pipe(
                retry(3),
                catchError(err => { return CommonUtils.httpErrorHandler(err) })
            );
    }

    getItemsBySearchTerm(term: string): string[] {
        term = term.replace(' ', '+');
        this.httpClient.get(this.itemsRestUrl + '/search/' + term, this.getHeadersForFetch())
            .subscribe({
                next: data => {
                    this.data = data
                },
                error: httpErrorResponse => {
                    return CommonUtils.httpErrorHandler(httpErrorResponse)
                }
            });
        return this.data;
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
                'Access-Control-Allow-Method': 'GET, POST, PUT',
                Authorization: 'Bearer ' + this.userService.getToken()
            },
            observe: 'body',
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer' // origin, origin-when-cross-origin, same-origin, strict-origin,        
        }
        return httpOptionsFetch;
    }


}
