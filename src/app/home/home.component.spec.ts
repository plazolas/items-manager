import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

import { HomeComponent } from './home.component';
import {ItemService} from '../services/item.service';
import {UserService} from '../services/user.service';
import {LoginService} from '../services/login.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  class MockItemsService {
    getItemsBySearchTerm(searchTerm: any) {
      return [
        {
          id: 164,
          firstname: 'Bob',
          lastname: 'Ward',
          position: 'janitor',
          age: 51,
          boss: 167,
          countryName: 'Afghanistan',
          countryId: 1,
          passportNumber: 'B115A6A',
          passportId: 73,
          valid: true
        }]
    };
  }

  class MockUserService {
    isLoggedIn() {
      return true
    };
    login(user: any, password: any) {}
  }

  class MockLoginService {
    signup() { return true};
    authenticate(user: any, password: any) {}
  }

  TestBed.resetTestEnvironment();
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [HomeComponent, { provide: ItemService, useClass: MockItemsService},
                  HomeComponent, { provide: UserService, useClass: MockUserService},
                  HomeComponent, { provide: LoginService, useClass: MockLoginService}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Home Component got created', () => {
    expect(component).toBeTruthy();
  });

  it('should contain "Welcome"', () => {
    const e: HTMLElement = fixture.nativeElement;
    expect(e.textContent).toContain('WELCOME');
  });
});
