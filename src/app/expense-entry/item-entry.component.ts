import {
  Component,
  OnInit, OnChanges,
  ViewContainerRef,
  SimpleChanges,
  Input, Output,
  Optional,
  ChangeDetectorRef, ChangeDetectionStrategy, EventEmitter,
} from '@angular/core';
import { ExpenseEntry } from '../model/expense-entry';
import { ExpenseEntryService } from '../services/expense-entry.service';

@Component({
  selector: 'app-item-entry',
  templateUrl: './item-entry.component.html' ,
  styleUrls: ['./item-entry.component.css'],
  exportAs: 'NgForm'
})

export class ItemEntryComponent implements OnInit, OnChanges {
  title = 'Item Entry';

  @Input() person: ExpenseEntry = {} as ExpenseEntry;
  @Input() submitted = false;
  @Output() getSubmitStatusChange = new EventEmitter<boolean>();

  constructor(private expenseEntryService: ExpenseEntryService) {}

  ngOnInit() {}

  // personChanges.prop contains the old and the new value...
  ngOnChanges(personChanges: SimpleChanges) {
    if (personChanges.person && !personChanges.person.firstChange && personChanges.person.previousValue !== 'undefined') {
      // console.log(this.constructor.name + '::' + this.ngOnChanges.name + ' changes :');
      // console.log(personChanges);
    }
    // personChanges.prop contains the old and the new value...
  }
  
  onSubmit() {
    this.submitted = true;
    this.expenseEntryService.updateExpenseEntry(this.person)
      .subscribe( data => { this.person = data as ExpenseEntry; },
                  err  => { console.log( 'updateExpenseEntry error:' + err); },
                ()  => this.getSubmitStatusChange.emit(true)
      );

  }

}
