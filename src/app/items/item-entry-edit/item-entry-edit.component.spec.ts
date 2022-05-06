import {async, ComponentFixture, TestBed } from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ItemService} from '../../services/item.service';
import {ItemEntryEditComponent} from './item-entry-edit.component';

describe('ItemEntryEditComponent', () => {
  let component: ItemEntryEditComponent;
  let fixture: ComponentFixture<ItemEntryEditComponent>;
  let service: ItemService;
  let httpClient: HttpClient;
  let router: RouterTestingModule;

  TestBed.resetTestEnvironment();
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, 
                HttpClientModule,
                RouterTestingModule.withRoutes(
            [{path: 'list_items', component: ItemEntryEditComponent}]
                )],
      declarations: [ItemEntryEditComponent],
      providers: [HttpClient, ItemService]
    }).compileComponents();
  }));

  beforeEach(() => {
    httpClient = TestBed.get(HttpClient);
    service = TestBed.get(ItemService);
    router = TestBed.get(RouterTestingModule);
    fixture = TestBed.createComponent(ItemEntryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Edit Item'`, () => {
    expect(component.title).toEqual('Edit Item');
  });

  it(`should get response from service'`,
      (done: DoneFn) => {
        service.getItem(185).subscribe(item => {
          expect(JSON.stringify(item)).toContain('Alba');
          console.log(item);
          done();
        });
  });
  
  
});
