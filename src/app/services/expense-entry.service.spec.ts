import 'zone.js/dist/proxy.js';
import 'zone.js/dist/zone';
import 'zone.js/dist/zone-testing';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/async-test';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/fake-async-test';

import {async, TestBed} from '@angular/core/testing';
import {ExpenseEntryService} from './expense-entry.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

describe('ExpenseEntryService', () => {

    let service: ExpenseEntryService;
    let httpClient: HttpClient;

    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

    beforeAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            declarations: [],
            providers: [HttpClient, ExpenseEntryService]
        }).compileComponents();
    }));
    
    beforeEach(() => {
        httpClient = TestBed.get(HttpClient);
        service = TestBed.get(ExpenseEntryService);
    });
    // afterEach(() => {
       // httpTestingController.verify();
    // });
    
    it('should be created', () => {
        service = TestBed.get(ExpenseEntryService);
        expect(service).toBeTruthy();
    });

    it(`service should work`,
        (done: DoneFn) => {
            service.getExpenseEntry(185).subscribe(item => {
                expect(JSON.stringify(item)).toContain('Alba');
                console.log(item);
                done();
            });
        });
});
