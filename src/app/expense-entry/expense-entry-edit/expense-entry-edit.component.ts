import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ExpenseEntry } from "../../model/expense-entry";
import {ExpenseEntryService} from "../../services/expense-entry.service";

@Component({
  selector: 'app-expense-entry-edit',
  templateUrl: './expense-entry-edit.component.html',
  styleUrls: ['./expense-entry-edit.component.css']
})
export class ExpenseEntryEditComponent implements OnInit {

  title: string = "";
  idControl = new FormControl('');

  @Input() person: ExpenseEntry = <ExpenseEntry> {};

  constructor(private expenseEntryService : ExpenseEntryService) {}

  ngOnInit() {
    this.title = 'Edit Person'
    this.expenseEntryService.getExpenseEntry(101)
      .subscribe( data => this.person = <ExpenseEntry> data);
  }

}
