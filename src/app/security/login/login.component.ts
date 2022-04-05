import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {LoginService} from '../../services/login.service';
import {ResBody} from '../../model/res-body';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    private readonly expenseRestUrl = environment.backEndUrl + '/api/vi/person';

    username = '';
    password = '';

    loginFailed = false;
    failedMsg = '';

    constructor(private router: Router, private loginService: LoginService, private cookieService: CookieService) {}


    ngOnInit() {
        // navigate to the root if we already have a token set (are logged in)
        if (this.cookieService.check('token')) {
            this.router.navigate(['/list_items']);
        }
    }

    onSubmit() {
        this.loginService.authenticate(this.username, this.password)
            .subscribe( (response: ResBody) => {
                if (response.success) {
                    this.cookieService.set('username', response.user, 3, '/');
                    this.cookieService.set('token', response.token, 3, '/');
                    this.router.navigate(['/list_items']);
                } else {
                    this.loginFailed = true;
                        this.failedMsg = 'Check username password, Login failed!';
                }
            }, error => {
                this.loginFailed = true;
                if (error.status === 503) {
                    this.failedMsg = 'Too many failed attempts. Try again in a few minutes.';
                } else {
                    this.failedMsg = 'Check username password, Login failed!';
                }
            });
    }
    
    signUp() {
        console.log('creating: '+this.username, this.password);
        this.loginService.signup(this.username,this.password)
            .subscribe( (response : ResBody) => {
                if (response.success) {
                    this.cookieService.set('username', response.user, 365, '/');
                    this.cookieService.set('token', response.token, 365, '/');
                    this.router.navigate(['/list_items']);
                }
            }, error => {
                this.loginFailed = true;
                if (error.status !== 200) {
                    this.failedMsg = 'Sign Up failed!';
                }
            });
        
    }

}
