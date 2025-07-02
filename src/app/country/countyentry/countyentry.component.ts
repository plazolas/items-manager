import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppCountry} from '../../model/app-country';
import {CountryService} from '../../services/country-service';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-countyentry',
  templateUrl: './countyentry.component.html',
  styleUrls: ['./countyentry.component.css']
})
export class CountyentryComponent implements OnInit {

  title = 'Country Edit';
  countries: AppCountry[] = [];
  countryId = 50;
  submit = false;

  @Input() country: AppCountry = {} as AppCountry;
  @Input() childSubmitted = false;
  @Output() getSubmitStatusChange = new EventEmitter<boolean>();

  nameChanged = false;
  constructor(private countryService: CountryService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']).then();
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '50';
    this.countryId = parseInt(id, 10);
    this.getCountryObj(this.countryId)
  }

  refreshCountries(refresh: boolean, country: AppCountry) {
    this.getAllCountries();
    // this.country = this.getCountryObj(country.id);
    this.submit = false;
  }

  getAllCountries(): void {
    this.countryService.getCountries()
        .subscribe( (data) => {
          this.countries = data as AppCountry[];
        })
  }

  getCountryObj(id: number): AppCountry {
    this.countryService.getCountry(id)
        .subscribe({ next: res => {
            this.country = res as AppCountry;
          }});
    return this.country;
  }

  onSubmit() {
    this.countryService.updateCountry(this.country)
        .subscribe({
          next: data => {
            if(data == null) {
              alert('Update Name Error');
              return;
            }
            this.childSubmitted = true;
            this.nameChanged = false;
            this.getSubmitStatusChange.emit(true)
          },
          error: (err) => {
            console.log(err);
            alert('Could not update name: \n' + err.error)
          },
          complete: () => {}
        });
  }

  onNameChange() {
    this.nameChanged = true;
  }

}
