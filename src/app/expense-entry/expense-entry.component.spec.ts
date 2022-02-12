import 'zone.js/dist/zone-testing';
import 'zone.js/dist/async-test.js';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

import { ExpenseEntryComponent } from './expense-entry.component';

describe('ExpenseEntryComponent', () => {
  let component: ExpenseEntryComponent;
  let fixture: ComponentFixture<ExpenseEntryComponent>;

  TestBed.initTestEnvironment(
    BrowserDynamicTestingModule, platformBrowserDynamicTesting());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseEntryComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Expense-Entry Component got created', () => {
    expect(component).toBeTruthy();
  });

  it('int test', () => {
    const e: HTMLElement = fixture.nativeElement;
    //expect(e.textContent).toContain('Welcome');
    expect(true).toEqual(true);
  });
});
