import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseEntryEditComponent } from './expense-entry-edit.component';

describe('ExpenseEntryEditComponent', () => {
  let component: ExpenseEntryEditComponent;
  let fixture: ComponentFixture<ExpenseEntryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseEntryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseEntryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
