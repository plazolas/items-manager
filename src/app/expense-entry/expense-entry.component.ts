import {
  Component,
  OnInit, OnChanges,
  ViewContainerRef,
  SimpleChanges,
  Input, Output,
  Optional,
  ChangeDetectorRef, ChangeDetectionStrategy, EventEmitter,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ExpenseEntry } from '../model/expense-entry';
import { ExpenseEntryService } from '../services/expense-entry.service';

@Component({
  selector: 'app-expense-entry',
  templateUrl: './expense-entry.component.html' ,
  styleUrls: ['./expense-entry.component.css'],
  exportAs: 'NgForm'
})

export class ExpenseEntryComponent implements OnInit, OnChanges {
  title: string = "";

  @Input() person: ExpenseEntry = <ExpenseEntry> {};
  @Input() submitted: boolean = false;
  @Output() getSubmitStatusChange = new EventEmitter<boolean>();

  constructor(private expenseEntryService: ExpenseEntryService) {}

  ngOnInit() {
    this.title = "Edit Person Name";
  }

  // personChanges.prop contains the old and the new value...
  ngOnChanges(personChanges: SimpleChanges) {
    if(personChanges.person && personChanges.person.firstChange != true && personChanges.person.previousValue != 'undefined') {
      // console.log(this.constructor.name + '::' + this.ngOnChanges.name + ' changes :');
      // console.log(personChanges);
    }
    // personChanges.prop contains the old and the new value...
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.person);
    this.expenseEntryService.updateExpenseEntry(this.person)
      .subscribe( data => { this.person = <ExpenseEntry> data; console.log(this.person)},
                  err  => { console.log(err)},
                ()  => this.getSubmitStatusChange.emit(true)
      );

  }

}
