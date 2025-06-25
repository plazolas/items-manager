import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {AppRoutingModule} from '../../app-routing.module';
import {LoginService} from '../../services/login.service';
import {UserService} from '../../services/user.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      providers: [AppRoutingModule, LoginService, UserService]
    });
    component = TestBed.inject(LoginComponent);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
