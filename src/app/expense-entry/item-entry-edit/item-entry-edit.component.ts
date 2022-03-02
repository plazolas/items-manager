import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import { ExpenseEntry } from '../../model/expense-entry';
import {ExpenseEntryService} from '../../services/expense-entry.service';
import { ActivatedRoute } from '@angular/router';
import {isObject} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-item-entry-edit',
  templateUrl: './item-entry-edit.component.html',
  styleUrls: ['./item-entry-edit.component.css']
})
export class ItemEntryEditComponent implements OnInit {

  title = 'Edit Item';
  itemId = 0;
  loaded = false;
  params =  this.activatedRoute.snapshot.params;
  @Input() person: ExpenseEntry = {} as ExpenseEntry;
  @Input() submitted = false;
  @Output() getSubmitStatusChange = new EventEmitter<boolean>();

  constructor(private expenseEntryService: ExpenseEntryService, private router: Router, private activatedRoute: ActivatedRoute) {}
  
  ngOnInit() {
    if (Object.keys(this.params).length === 0 && !this.params.hasOwnProperty('itemid')) {
      this.router.navigate(['/list_items']);
    } else {
      this.itemId = this.activatedRoute.snapshot.params.itemid.valueOf();
      this.expenseEntryService.getExpenseEntry(this.itemId)
          .subscribe(data => { 
            this.person = data as ExpenseEntry; 
            this.loaded = true; 
          });
    }
  }
  
  isLoading(): boolean {
    return this.loaded;
  }

  onSubmit() {
      this.expenseEntryService.updateExpenseEntry(this.person)
          .subscribe(data => {
                this.person = data as ExpenseEntry;
                console.log(this.person);
              },
              err => {
                console.log(err);
              },
              () => this.getSubmitStatusChange.emit(true)
          );

  }
}
  

