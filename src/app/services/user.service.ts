import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {ResBody} from '../model/res-body';
import {environment} from '../../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {CommonUtils} from '../utils/commonUtils';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly itemRestUrl = environment.backEndUrl + '/api/vi/person';
    private readonly signupPath = this.itemRestUrl + '/account';
    private readonly loginPath = this.itemRestUrl + '/account/token';
    private token = '';

    constructor(private httpClient: HttpClient, private cookieService: CookieService, private router: Router) {
        if (!this.isLoggedIn()) {
            this.router.navigate(['/home']).then();
        }
    }

    getHeaders(): object {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Method': 'GET, POST, DELETE',
                Authorization: 'Bearer ' + this.getToken()
            }),
            observe: 'body'
        }
        return httpOptions;
    }

    getHeadersForResponse(): object {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Method': 'GET, POST, PUT, DELETE, PATCH',
                Authorization: 'Bearer ' + this.getToken()
            }),
            observe: 'response'
        }
        return httpOptions;
    }

    getAuth(username: string, password: string): Observable<HttpResponse<ResBody>> {
        return this.httpClient.get<ResBody>(this.itemRestUrl + environment.loginPath +
            `?username=` + username + `&password=` + password, {observe: 'response'})
    }

    getToken(): string {
        if (!this.isLoggedIn()) {
            this.router.navigate(['/home']).then();
        }
        return this.cookieService.get('token');
    }

    isLoggedIn(): boolean {
        return this.cookieService.check('token');
    }

    logOut() {
        this.cookieService.delete('username', '/')
        this.cookieService.delete('token', '/')
        this.router.navigate(['/home']).then()
    }

    login(username: string, token: string) {
        this.cookieService.set('username', username, 3, '/');
        this.cookieService.set('token', token, 3, '/');
    }

    getUsername(): string {
        return this.cookieService.get('username')
    }
}
