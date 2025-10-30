import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {CommonUtils} from '../utils/commonUtils';

@Injectable({
    providedIn: 'root'
})
export class NewsService {

    private readonly artistRestUrl = environment.backEndUrl + '/news/';

    public readonly httpOptions = {};

    constructor(private httpClient: HttpClient) {}

    getTopHeadlines(country: string): Observable<object> {
        const url = this.artistRestUrl + 'top-headlines/' + country;
        return this.httpClient.get(url, this.httpOptions)
            .pipe(
                retry(3),
                catchError(err => { return CommonUtils.httpErrorHandler(err) })
            );
    }

    getEverything(topic: string): Observable<object> {
        const url = this.artistRestUrl + 'everything/' + topic;
        return this.httpClient.get(url, this.httpOptions)
            .pipe(
                retry(3),
                catchError(err => { return CommonUtils.httpErrorHandler(err) })
            );
    }

}
