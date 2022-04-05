import {Injectable} from '@angular/core';
import {ExpenseEntry} from '../model/expense-entry';

import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {UserService} from './user.service';

@Injectable()
export class ExpenseEntryService {
    private readonly expenseRestUrl = environment.backEndUrl + '/api/vi/person';
    private endPointUrl = environment.backEndUrl;
    private token = '';
    private httpOptions = {};
    public lastId = 0;
    
    constructor(private httpClient: HttpClient, private cookieService: CookieService, private router: Router,
                private userService: UserService) {
        if (!this.userService.isLoggedIn()) {
            this.router.navigate(['/login']).then();
        }
        this.token = this.userService.getToken();
        this.httpOptions = userService.getHeaders();
    }
    
    getLastId(): number {
        return this.lastId;
    }   

    getLastIdObs(): Observable<number> {
        return this.httpClient.get<number>(this.expenseRestUrl + '/findlast', this.httpOptions)
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
