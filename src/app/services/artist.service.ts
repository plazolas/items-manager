import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ArtistService {

    private readonly artistRestUrl = environment.backEndUrl + '/api/vi/gateway/artist';

    public readonly httpOptions = {};

    constructor(private httpClient: HttpClient) {}

    getArtistById(id: number): Observable<object> {
        const url = this.artistRestUrl + '/id?id=' + id;
        return this.httpClient.get(url, this.httpOptions)
            .pipe(
                retry(3),
                catchError(this.httpErrorHandler)
            );
    }

    getArtistBySid(id: string): Observable<object> {
        const url = this.artistRestUrl + '/id?id=' + id;
        return this.httpClient.get(url, this.httpOptions)
            .pipe(
                retry(3),
                catchError(this.httpErrorHandler)
            );
    }

    getArtistsByName(name: string): Observable<object> {
        const url = this.artistRestUrl + '/name?name=' + name;
        return this.httpClient.post(url, this.httpOptions)
            .pipe(
                retry(3),
                catchError(this.httpErrorHandler)
            );
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
        } else {
            msg = 'An error happened in server.';
        }
        return throwError( msg );
    }
}
