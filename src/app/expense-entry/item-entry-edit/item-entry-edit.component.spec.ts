import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemEntryEditComponent } from './item-entry-edit.component';
import { FormsModule } from '@angular/forms';
import {ExpenseEntryService} from '../../services/expense-entry.service';

describe('ItemEntryEditComponent', () => {
  let component: ItemEntryEditComponent;
  let fixture: ComponentFixture<ItemEntryEditComponent>;

  beforeAll(() => {
    TestBed.resetTestEnvironment();
    // TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  beforeEach(async(() => {
    
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemEntryEditComponent ],
      imports: [ FormsModule ],
      providers: [ ExpenseEntryService ]
    });
    component = TestBed.get(ExpenseEntryService);
    
    fixture = TestBed.createComponent(ItemEntryEditComponent);
    // fixture.debugElement.injector.get(ExpenseEntryService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be create', () => {
    expect(component).toBeTruthy();
  });
});
