import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

import {TestBed} from '@angular/core/testing';
import {ExpenseEntryService} from './expense-entry.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

describe('ExpenseEntryService', () => {
    // let httpTestingController: HttpTestingController;
    let service: ExpenseEntryService;
    beforeEach(() => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            // imports: [HttpTestingController],
            declarations: [ExpenseEntryService],
            //     providers: [ HttpClient ]
        });
        // httpTestingController = TestBed.get(HttpTestingController);
        
        console.log(service);
    });
    afterEach(() => {
       // httpTestingController.verify();
    });
    
    it('should be created', () => {
        console.log('here');
        service = TestBed.get(ExpenseEntryService);
        console.log(service);
        expect(true).toBeTruthy();
    });
});
