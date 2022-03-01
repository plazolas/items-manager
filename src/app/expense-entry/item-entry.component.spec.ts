import 'zone.js/dist/proxy.js';
import 'zone.js/dist/zone';
import 'zone.js/dist/zone-testing';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { ItemEntryComponent } from './item-entry.component';
import {FormsModule} from '@angular/forms';
import {ExpenseEntryService} from '../services/expense-entry.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ExpenseEntry} from '../model/expense-entry';

describe('ItemEntryComponent', () => {
  let component: ItemEntryComponent;
  let fixture: ComponentFixture<ItemEntryComponent>;
  let service: ExpenseEntryService;
  let httpClient: HttpClient;

  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule],
      declarations: [ItemEntryComponent],
      providers: [HttpClient, ExpenseEntryService]
    }).compileComponents();
  }));

  beforeEach(() => {
    httpClient = TestBed.get(HttpClient);
    service = TestBed.get(ExpenseEntryService);
    fixture = TestBed.createComponent(ItemEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Item-Entry Component got created', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Item Entry'`, () => {
    expect(component.title).toEqual('Item Entry');
  });

  it(`should use service'`,
      (done: DoneFn) => {
        service.getExpenseEntry(168).subscribe(item => {
          expect(JSON.stringify(item)).toContain('Brandon');
          console.log(item);
          done();
        });
  });
  
  
  
  
});
