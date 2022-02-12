import { TestBed } from '@angular/core/testing';

import { ExpenseEntryService } from './expense-entry.service';

describe('ExpenseEntryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpenseEntryService = TestBed.get(ExpenseEntryService);
    expect(service).toBeTruthy();
  });
});
