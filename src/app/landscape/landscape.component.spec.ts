import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import {FormsModule} from '@angular/forms';
import {ItemService} from '../services/item.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import {ArtistsComponent} from './landscape.component';
import {ItemEntryComponent} from '../items/item-entry.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('ItemsListComponent', () => {
  let component: ArtistsComponent;
  let fixture: ComponentFixture<ArtistsComponent>;
  let service: ItemService;
  let httpClient: HttpClient;

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
              [{path: 'edit_item', component: ArtistsComponent}]
        )],
      declarations: [ArtistsComponent, ItemEntryComponent],
      providers: [HttpClient, ItemService]
    }).compileComponents();
  }));

  beforeEach(() => {
    httpClient = TestBed.get(HttpClient);
    service = TestBed.get(ItemService);
    fixture = TestBed.createComponent(ArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Items list'`, () => {
    expect(component.title).toEqual('Items list');
  });

  it(`should use service'`,
      (done: DoneFn) => {
        service.getItem(185).subscribe(item => {
          expect(JSON.stringify(item)).toContain('Alba');
          console.log(item);
          done();
        });
  });
  
  
  
  
});
