import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import { ExpenseEntry } from '../../model/expense-entry';
import {ExpenseEntryService} from '../../services/expense-entry.service';
import { ActivatedRoute } from '@angular/router';
import {HttpHeaders} from '@angular/common/http';
// import {isObject} from 'rxjs/internal-compatibility';

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
  token = '';
  httpOptions = {};
  @Input() person: ExpenseEntry = {} as ExpenseEntry;
  @Input() submitted = false;
  @Output() getSubmitStatusChange = new EventEmitter<boolean>();

  constructor(private expenseEntryService: ExpenseEntryService, private router: Router, private activatedRoute: ActivatedRoute) {
      if (this.expenseEntryService.getToken() !== '' ) {
          this.expenseEntryService.getAuth()
              .subscribe({
                  next: resp => {
                      if (resp.body?.success && resp.body?.user.length > 0) {
                          this.token = resp.body.token;
                          this.expenseEntryService.setAuthHeaders(resp.body.token);
                          this.setAuthHeaders(resp.body.token);
                          this.getItemById()
                      }
                  },
                  error: (err) => {
                      console.log(err);
                  },
                  complete: () => {
                  }
              });
      } else {
          this.token = this.expenseEntryService.getToken();
          this.setAuthHeaders(this.token);
          this.getItemById()
      }
  }
  
  ngOnInit() {}
  
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
              () => { this.getSubmitStatusChange.emit(true); this.router.navigate(['/list_items']) }
          );

  }
  
  getItemById() {
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

    setAuthHeaders(token: string): void {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Method': 'GET, POST, PUT, DELETE',
                Authorization: 'Bearer ' + token
            })
        }
        console.log('exp-entry-src Auth ' + this.token)
    }
}
  

