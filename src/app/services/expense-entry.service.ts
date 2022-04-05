import {Injectable, OnInit} from '@angular/core';
import {ExpenseEntry} from '../model/expense-entry';

import {from, noop, Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ResBody} from '../model/res-body';

@Injectable()
export class ExpenseEntryService {
    private readonly expenseRestUrl = environment.backEndUrl + '/api/vi/person';
    private endPointUrl = environment.backEndUrl;
    private token = '';
    private httpOptions = {};
    public lastId = 0;
    
    constructor(private httpClient: HttpClient) {}

    setAuthHeaders(token: string): void {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Method': 'GET, POST, PUT, DELETE',
                Authorization: 'Bearer ' + token
            })
        }
        console.log('exp-entry-src Auth ' + this.token)
    }

    getAuthHeaders(): object {
        return this.httpOptions;
    }
    
    getAuth(): Observable<HttpResponse<ResBody>> {
        return this.httpClient.get<ResBody>(this.expenseRestUrl + environment.loginPath +
            `?username=` + environment.appUserName + `&password=` + environment.appUserPass, {observe: 'response'})
    }

    setToken(): string {
        this.httpClient.get<ResBody>(this.expenseRestUrl + environment.loginPath +
            `?username=` + environment.appUserName + `&password=` + environment.appUserPass, {observe: 'response'})
            .subscribe({
                next: resp => {
                    if (resp.body?.success && resp.body?.user.length > 0) {
                        this.token = resp.body.token;
                        this.setAuthHeaders(this.token);
                    }
                },
                error: (err) => { console.log(err); },
                complete: () => {}
            });
        return this.token;
    }
    
    getToken(): string {
        return this.token;
    }
    
    getLastId(): number {
        return this.lastId;
    }   

    getLastIdObs(): Observable<number> {
        return this.httpClient.get<number>(this.expenseRestUrl + '/findlast', this.getAuthHeaders())
            .pipe(
                retry(3),
                catchError(this.httpErrorHandler)
            );
    }

    getExpenseEntries(): Observable<object> {
        return this.httpClient.get(this.expenseRestUrl, this.httpOptions)
            .pipe(
                retry(3),
                catchError(this.httpErrorHandler)
            );
    }

    getExpenseEntry(id: number): Observable<object> {
        console.log('getExpenseEntry id: '+id);
        const res = this.httpClient.get(this.expenseRestUrl + '/' + id, this.httpOptions);
        return res
            .pipe(
                retry(3),
                catchError(this.httpErrorHandler)
            );
    }

    addExpenseEntry(expenseEntry: ExpenseEntry): Observable<ExpenseEntry> {
        return this.httpClient.post<ExpenseEntry>(this.expenseRestUrl, expenseEntry, this.httpOptions)
            .pipe(
                retry(3),
                catchError(this.httpErrorHandler)
            );
    }

    updateExpenseEntry(expenseEntry: ExpenseEntry): Observable<ExpenseEntry> {
        return this.httpClient.put<ExpenseEntry>(this.expenseRestUrl + '/' + expenseEntry.id, expenseEntry, this.httpOptions)
            .pipe(
                retry(3),
                catchError(this.httpErrorHandler)
            );
    }

    deleteExpenseEntry(expenseEntry: ExpenseEntry | number): Observable<ExpenseEntry> {
        const id = typeof expenseEntry === 'number' ? expenseEntry : expenseEntry.id;
        const url = `${this.expenseRestUrl}/${id}`;

        return this.httpClient.delete<ExpenseEntry>(url, this.httpOptions)
            .pipe(
                retry(3),
                catchError(this.httpErrorHandler)
            );
    }

    private httpErrorHandler(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('A client side error occurs. The error message is ' + error.message);
        } else {
            console.error(
                'An error happened in server. The HTTP status code is ' + error.status + ' and the error returned is ' + error.message);
        }

        return throwError('Error occurred. Pleas try again');
    }


}
