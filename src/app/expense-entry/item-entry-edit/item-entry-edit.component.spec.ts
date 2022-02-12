import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEntryEditComponent } from './item-entry-edit.component';

describe('ExpenseEntryEditComponent', () => {
  let component: ItemEntryEditComponent;
  let fixture: ComponentFixture<ItemEntryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemEntryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEntryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
