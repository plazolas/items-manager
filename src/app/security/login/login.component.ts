import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {ResBody} from '../../model/res-body';
import {UserService} from '../../services/user.service';
import {AppRoutingModule} from '../../app-routing.module';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username = '';
    password = '';
    useremail = '';
    phone = '';
    loginFailed = false;
    failedMsg = '';

    constructor(private routing: AppRoutingModule, private loginService: LoginService, private userService: UserService) {}

    ngOnInit() {
        // navigate to the root if we already have a token set (are logged in)
        if (this.userService.isLoggedIn()) {
            this.routing.router.navigate(['/list_items']).then();
        }
    }

    onSubmit() {
        this.loginService.authenticate(this.username, this.password)
            .subscribe({
                next: (response: ResBody) => {
                if (response.success) {
                    this.userService.login(response.user, response.token)
                    this.routing.router.navigate(['/list_items']).then()
                } else {
                    this.loginFailed = true;
                    this.failedMsg = 'Check username password, Login failed!';
                }
            },
                error: error => {
                this.loginFailed = true;
                if (error.status === 503) {
                    this.failedMsg = 'Too many failed attempts. Try again in a few minutes.';
                } else {
                    this.failedMsg = 'Check username password, Login failed!';
                }
            }
         });
    }
    
    signUp() {
        this.loginService.signup(this.username, this.password, this.useremail, this.phone)
            .subscribe({
                next: (response: ResBody) => {
                    console.log(response)
                    if (response.success) {
                        console.log('created new user');
                        this.onSubmit()
                    } else {
                        if(response.message.includes('Returning user')) {
                            console.log('returning user');
                            this.onSubmit()
                        }
                    }
                },
                    error: error => {
                    console.log('signup error');
                    this.loginFailed = true;
                    if (error.status !== 200) {
                        this.failedMsg = 'Sign Up failed!';
                    }
                }
            });
        
    }

}
