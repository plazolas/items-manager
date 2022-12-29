import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {CommonUtils} from '../utils/commonUtils';

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
                catchError(err => { return CommonUtils.httpErrorHandler(err) })
            );
    }

    getArtistBySid(id: string): Observable<object> {
        const url = this.artistRestUrl + '/id?id=' + id;
        return this.httpClient.get(url, this.httpOptions)
            .pipe(
                retry(3),
                catchError(err => { return CommonUtils.httpErrorHandler(err) })
            );
    }

    getArtistsByName(name: string): Observable<object> {
        const url = this.artistRestUrl + '/name?name=' + name;
        return this.httpClient.post(url, this.httpOptions)
            .pipe(
                retry(3),
                catchError(err => { return CommonUtils.httpErrorHandler(err) })
            );
    }
}
