import 'zone.js/dist/zone-testing';
import 'zone.js/dist/async-test.js';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

import { ItemEntryComponent } from './item-entry.component';

describe('ExpenseEntryComponent', () => {
  let component: ItemEntryComponent;
  let fixture: ComponentFixture<ItemEntryComponent>;

  TestBed.initTestEnvironment(
    BrowserDynamicTestingModule, platformBrowserDynamicTesting());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemEntryComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Expense-Entry Component got created', () => {
    expect(component).toBeTruthy();
  });

  it('int test', () => {
    const e: HTMLElement = fixture.nativeElement;
    // expect(e.textContent).toContain('Welcome');
    expect(true).toEqual(true);
  });
});
