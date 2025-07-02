import {Component, Input, OnInit} from '@angular/core';
import {AppCountry} from '../model/app-country';
import {CountryService} from '../services/country-service';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  @Input() country: AppCountry = {} as AppCountry;
  title = 'Countries';
  token = '';
  httpOptions = {};
  countries: AppCountry[] = [];
  submit = false;


  constructor(private countryService: CountryService,
              private userService: UserService,
              private router: Router) {

    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']).then();
    }
    this.getTokeAndHeaders();

  }

  ngOnInit(): void {
    this.getAllCountries()
  }

  getCountry(id: number) { return this.countryService.getCountry(id) }

  getAllCountries(): void {
    this.countryService.getCountries()
        .subscribe( (data) => {
          this.countries = data as AppCountry[];
        })
  }

  refreshCountries(refresh: boolean, country: AppCountry) {
    this.getAllCountries();
    this.submit = false;
  }

  getCountryObj(id: number): AppCountry {
    this.countryService.getCountry(id)
        .subscribe({ next: res => {
            const r = res as HttpResponse<AppCountry>
            this.country = r.body as AppCountry;
          }});
    return this.country;
  }

  getTokeAndHeaders() {
    this.token = this.userService.getToken()
    this.httpOptions = this.userService.getHeaders();
  }

  clickedCountry(event: any, id: number) {
    this.countryService.getCountry(id)
        .subscribe(res => {
          this.country =  res as AppCountry;
          // const item: string[] = [JSON.stringify(body)];
          // this.itemObservable$ = from(item);
          });
  }

  public navigateToSection(section: string) {
    window.location.hash = '';
    window.location.hash = section;
  }

  }
