import 'zone.js/dist/zone-testing';
import 'zone.js/dist/async-test.js';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  TestBed.initTestEnvironment(
    BrowserDynamicTestingModule, platformBrowserDynamicTesting());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();
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
    //expect(true).toEqual(true);
    expect(e.textContent).toContain('Welcome');
  });
});
