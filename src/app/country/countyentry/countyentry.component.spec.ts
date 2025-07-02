import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountyentryComponent } from './countyentry.component';

describe('CountyentryComponent', () => {
  let component: CountyentryComponent;
  let fixture: ComponentFixture<CountyentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountyentryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountyentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
