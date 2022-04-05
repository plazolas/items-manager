import { Component } from '@angular/core';
import {environment} from '../environments/environment';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {LoginService} from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OzDev Engineering';
  wandUrl = environment.wandUrl;
  backUrl = environment.backEndUrl;
  displayStyle = 'none';

  constructor(private route: ActivatedRoute, private router: Router,
              private loginService: LoginService, public cookieService: CookieService) {
    // listen to every routing event and redirect the route to login if the user is not logged in (or trying to sign up)
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && !this.loggedIn()
          && event.url !== '/'
          && event.url !== '/about'
          && event.url !== '/wand'
          && event.url !== '/signup') {
        this.router.navigate(['/login']);
      }
    });
  }

  loggedIn(): boolean {
    return (this.cookieService.check('token') && this.cookieService.get('token').length > 0);
  }

  logOut() {
    this.cookieService.delete('username', '/');
    this.cookieService.delete('token', '/');
    this.router.navigate(['/']);
  }

  openPopup() {
    this.displayStyle = 'block';
  }
  
  closeDialog() {
    this.displayStyle = 'none';
  }

  closePopup() {
    this.displayStyle = 'none';
    this.logOut();
  }
}
