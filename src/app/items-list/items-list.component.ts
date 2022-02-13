import { Component, OnInit } from '@angular/core';
import { Observable, Observer, from, fromEvent, of, range  } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { filter, map, catchError } from 'rxjs/operators';

import { DebugService } from '../services/debug.service';
import { ExpenseEntry } from '../model/expense-entry';
import { ExpenseEntryService } from '../services/expense-entry.service';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})

export class ItemsListComponent implements OnInit {
  title = 'Personnel Entry List';
  myName = this.constructor.name;
  employee: ExpenseEntry = {} as ExpenseEntry;
  item: ExpenseEntry = {} as ExpenseEntry;
  items: ExpenseEntry[] = [];
  submit = false;
  lastId = 117;

  expenseEntries: object = {};
  expenseEntriesStr = '';
  personOfMonth: ExpenseEntry = {} as ExpenseEntry;

  filterFnByEvenNumbers = filter( (n: number) => n % 2 === 0 );
  filterFnByEvenItems = filter( (p: ExpenseEntry) => p.id % 2 === 0 );

  numbers: number[] = [];
  val1 = 0;
  filteredNumbers: number[] = [];
  val2 = 0;
  processedNumbers: number[] = [];
  val3 = 0;
  counter = 0;

  personas: object[] = [];
  personal: object[] = [];
  itemCountStr = '';

  timeChange = new Observable<string> ((observer: Observer<string>) => {
    setInterval(() => observer.next(
      new Date().toString()), 1000);
    });

  itemObservable: Observable<string> = new Observable<string>();

  personChange: Observable<string> | null = null;
  oddPersons: ExpenseEntry[] = [];

  itemsEndPointUrl = '';

  constructor(private debugService: DebugService, private expenseEntryService: ExpenseEntryService, private http: HttpClient) {
    this.itemsEndPointUrl = (environment.production) ? 'http://172.31.80.136:8080' : 'http://localhost:8080' ;
  }

  ngOnInit() {

    const mapObjToLi = map( (obj: object) => '<li>' + JSON.stringify(obj) + '</li>');
    // observable
    const numbers$ = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    // observer
    const numberObserver = {
      next: (num: number) => {
            this.numbers.push(num);
            this.val1 += num;
      },
      error: (err: any) => console.log(err)
    };
    numbers$.subscribe(numberObserver);

    const filteredNumbers = this.filterFnByEvenNumbers(numbers$);
    filteredNumbers.subscribe( (num: number) => {
                            this.filteredNumbers.push(num);
                            this.val2 += num;
    });

    let e = document.getElementById('counter');
    if (e) {
      const clickEvent$ = fromEvent(e, 'click');
      clickEvent$.subscribe(() => this.counter++);
    }

    e = document.getElementById('counter');
    if (e) {
      const clickPersonEvent$ = fromEvent(e, 'click');
      clickPersonEvent$.subscribe(() => this.counter++);
    }
    this.showPersonsGrid();
  }

  getItems(): void {
    this.expenseEntryService.getExpenseEntries()
      .subscribe( data => {
        this.expenseEntries = data;
        this.expenseEntriesStr += JSON.stringify(data) + '<br>';
      });
  }

  getPersonById(id: number): string {
    this.expenseEntryService.getExpenseEntry(id)
          .subscribe(
            data => {
                this.item = data as ExpenseEntry;
          },
            (err) => { console.log(err); },
            () => {
          });
    return JSON.stringify(this.item);
  }

  getEmployeeById(id: number): string {
    const itemStr = JSON.stringify(this.employee);
    this.expenseEntryService.getExpenseEntry(id)
      .subscribe(
        data => {
          this.employee = data as ExpenseEntry;
        },
        (err) => { console.log(err); },
        () => {}
      );
    return (this.item.id % 2 === 0) ? itemStr + JSON.stringify(this.employee) : JSON.stringify(this.employee);
  }

  getExpenseItemObj(id: number): ExpenseEntry {
    this.expenseEntryService.getExpenseEntry(id)
      .subscribe(data => {
        this.item = data as ExpenseEntry;
      });
    return this.item;
  }

  clickedPerson(event: any, id: number) {
    this.expenseEntryService.getExpenseEntry(id)
      .subscribe( data => {
        this.item = data as ExpenseEntry;
        const item: string[] = [JSON.stringify(data)];
        this.itemObservable = from(item);
      });
    // const mapObjToString = map( (obj : Object) => JSON.stringify(obj) );
    // const personal$ = from(this.personal);
    // personal$.subscribe(this.personalObservable);
    // const personalToString$ = personal$.pipe(mapObjToString);
  }

  refreshList(refresh: boolean) {
    console.log(refresh);
    if (refresh) {
      console.log(this.constructor.name + '::' + this.refreshList.name);
      this.showPersonsGrid();
      this.submit = false;
    }
  }

  showPersonsGrid() {
    this.personal = [];
    this.http.get<number>(this.itemsEndPointUrl + '/api/vi/person/findlast')
      .subscribe(data => { this.lastId = data; },
       (err: any) => console.log(err),
       () => {
         this.expenseEntryService.getExpenseEntry(this.lastId)
           .subscribe( data => this.item = data as ExpenseEntry);
       });

    let ajaxResponse: AjaxResponse;
    const api$ = ajax({
      url: this.itemsEndPointUrl + '/api/vi/person',
      method: 'GET',
      headers: {Accept: '*/*' },
      body: {}
    });
    const ajaxObserver = {
      next: (res: any) => { this.personas = res.response; ajaxResponse = res; },
      error: (err: any) => console.log(err),
      complete: () => {
        this.personal = [];
        this.items = [];
        const personArr: ExpenseEntry[] = [];
        let count = 0;

        for (const person of this.personas) {
          count++;
          const p = person as ExpenseEntry;
          this.personal.push(person);
          personArr.push(p);
          // this.items.push(p);
        }

        let i = 0;
        function* personGen() {
          while (i < personArr.length) {
            return  personArr[i++];
          }
        }

        personArr.forEach((e) => {
          setTimeout(() => {
            this.items.push(e);
          }, 3000 ); });

        this.itemCountStr = 'Total items = ' + count;
        this.oddPersons = this.items.filter((p: ExpenseEntry) => p.id % 2 !== 0);
        this.personChange = new Observable<string> ((observer: Observer<string>) => {
        const index = Math.floor(Math.random() * this.items.length);
        console.log(index);
        setInterval(() => observer.next(
              this.getEmployeeById(this.items[index].id)
            ),
            5000);
        });
      }
    };
    api$.subscribe(ajaxObserver);
  }

}
