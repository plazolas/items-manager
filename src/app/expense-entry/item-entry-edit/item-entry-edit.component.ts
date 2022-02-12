import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ExpenseEntry } from '../../model/expense-entry';
import {ExpenseEntryService} from '../../services/expense-entry.service';

@Component({
  selector: 'app-item-entry-edit',
  templateUrl: './item-entry-edit.component.html',
  styleUrls: ['./item-entry-edit.component.css']
})
export class ItemEntryEditComponent implements OnInit {

  title = '';
  idControl = new FormControl('');

  @Input() person: ExpenseEntry = {} as ExpenseEntry;

  constructor(private expenseEntryService: ExpenseEntryService) {}

  ngOnInit() {
    this.title = 'Edit Person';
    this.expenseEntryService.getExpenseEntry(101)
      .subscribe( data => this.person = data as ExpenseEntry);
  }

}
