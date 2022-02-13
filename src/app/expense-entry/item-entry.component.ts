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
  templateUrl: './item-entry.component.html' ,
  styleUrls: ['./item-entry.component.css'],
  exportAs: 'NgForm'
})

export class ItemEntryComponent implements OnInit, OnChanges {
  title = '';

  @Input() person: ExpenseEntry = {} as ExpenseEntry;
  @Input() submitted = false;
  @Output() getSubmitStatusChange = new EventEmitter<boolean>();

  constructor(private expenseEntryService: ExpenseEntryService) {}

  ngOnInit() {
    this.title = 'Edit Person Name';
  }

  // personChanges.prop contains the old and the new value...
  ngOnChanges(personChanges: SimpleChanges) {
    if (personChanges.person && personChanges.person.firstChange !== true && personChanges.person.previousValue !== 'undefined') {
      // console.log(this.constructor.name + '::' + this.ngOnChanges.name + ' changes :');
      // console.log(personChanges);
    }
    // personChanges.prop contains the old and the new value...
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.person);
    this.expenseEntryService.updateExpenseEntry(this.person)
      .subscribe( data => { this.person = data as ExpenseEntry; console.log(this.person); },
                  err  => { console.log(err); },
                ()  => this.getSubmitStatusChange.emit(true)
      );

  }

}
