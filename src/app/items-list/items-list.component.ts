import { Component, OnInit, Output, Self } from '@angular/core';
import { Observable, Observer, from, fromEvent, of, range  } from 'rxjs';
import {ajax, AjaxResponse} from 'rxjs/ajax';
import { filter, map, catchError } from 'rxjs/operators';

import { DebugService } from '../services/debug.service';
import { ExpenseEntry } from '../model/expense-entry';
import { ExpenseEntryService } from '../services/expense-entry.service';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})

export class ItemsListComponent implements OnInit {

  title: string = "Personnel Entry List";
  myName = this.constructor.name;
  employee: ExpenseEntry = <ExpenseEntry> {};
  item: ExpenseEntry = <ExpenseEntry> {};
  items: ExpenseEntry[] = [];
  submit: boolean = false;
  lastId: number = 117;

  expenseEntries: Object = {};
  expenseEntry_str: string = "";
  expenseEntries_str: string = "";
  personOfMonth: ExpenseEntry = <ExpenseEntry> {};

  filterFnByEvenNumbers = filter( (n : number) => n % 2 == 0 );
  filterFnByEvenItems = filter( (p : ExpenseEntry) => p.id % 2 == 0 );

  numbers : number[] = [];
  val1 : number = 0;
  filteredNumbers : number[] = [];
  val2 : number = 0;
  processedNumbers : number[] = [];
  val3 : number = 0;
  counter : number = 0;

  personas: Object[] = [];
  personal : Object[] = [];
  itemCountStr : string = '';

  timeChange = new Observable<string> ((observer: Observer<string>) => {
    setInterval(() => observer.next(
      new Date().toString()), 1000);
    });
  itemObservable: Observable<Object> | null = null;

  personChange: Observable<string> | null = null;
  oddPersons: ExpenseEntry[] = [];

  constructor(private debugService: DebugService, private expenseEntryService : ExpenseEntryService, private http: HttpClient) {}

  ngOnInit() {

    const mapObjToLi = map( (obj : Object) => '<li>' + JSON.stringify(obj) + '</li>');
    // observable
    const numbers$ = from([1,2,3,4,5,6,7,8,9,10]);
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
    filteredNumbers.subscribe( (num : number) => {
                            this.filteredNumbers.push(num);
                            this.val2 += num;
    });

    let e = document.getElementById('counter');
    if(e) {
      const clickEvent$ = fromEvent(e, 'click');
      clickEvent$.subscribe(() => this.counter++);
    }

    e = document.getElementById('counter');
    if(e) {
      const clickPersonEvent$ = fromEvent(e, 'click');
      clickPersonEvent$.subscribe(() => this.counter++);
    }
    this.showPersonsGrid();
  }

  getItems() : void {
    this.expenseEntryService.getExpenseEntries()
      .subscribe( data => {
        this.expenseEntries = data;
        this.expenseEntries_str += JSON.stringify(data) + '<br>';
      });
  }

  getPersonById(id: number) : string {
    this.expenseEntryService.getExpenseEntry(id)
          .subscribe(
            data => {
                this.item = <ExpenseEntry> data;
          },
            (err) => { console.log(err) },
            () => {
          });
    return JSON.stringify(this.item);
  }

  getEmployeeById(id: number) : string {
    let itemStr = JSON.stringify(this.employee);
    this.expenseEntryService.getExpenseEntry(id)
      .subscribe(
        data => {
          this.employee = <ExpenseEntry> data;
        },
        (err) => { console.log(err) },
        () => {}
      );
    return (this.item.id % 2 == 0) ? itemStr + JSON.stringify(this.employee) : JSON.stringify(this.employee);
  }

  getExpenseItemObj(id: number) : ExpenseEntry {
    this.expenseEntryService.getExpenseEntry(id)
      .subscribe(data => {
        this.item = <ExpenseEntry> data;
      });
    return this.item;
  }

  clickedPerson(event: any, id: number) {
    this.expenseEntryService.getExpenseEntry(id)
      .subscribe( data => {
        this.item = <ExpenseEntry> data;
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
    if(refresh) {
      console.log(this.constructor.name + '::' + this.refreshList.name)
      this.showPersonsGrid();
      this.submit = false;
    }
  }

  showPersonsGrid() {
    this.personal = [];
    this.http.get<number>('http://localhost:8080/api/vi/person/findlast')
      .subscribe(data => { this.lastId = data },
       (err: any) => console.log(err),
       () => {
         this.expenseEntryService.getExpenseEntry(this.lastId)
           .subscribe( data => this.item = <ExpenseEntry> data);
       });

    let ajaxResponse: AjaxResponse;
    const api$ = ajax({
      url: 'http://localhost:8080/api/vi/person',
      method: 'GET',
      headers: {'Accept': '*/*' },
      body: {}
    });
    const ajaxObserver = {
      next: (res: any) => { this.personas = res.response; ajaxResponse = res; },
      error: (err: any) => console.log(err),
      complete: () => {
        this.personal = [];
        this.items = [];
        let personArr: ExpenseEntry[] = [];
        let count: number = 0;

        for(const person of this.personas) {
          count++;
          let p = <ExpenseEntry> person;
          this.personal.push(person);
          personArr.push(p);
          //this.items.push(p);
        }

        let i: number = 0;
        function* personGen() {
          while(i < personArr.length) {
            return  personArr[i++];
          }
        }

        personArr.forEach((e) => {
          setTimeout(() => {
            this.items.push(e);
          }, 3000 )});

        let personGenerator = personGen();
        let obj: any;
        // i=0;
        // while(i++ < personArr.length) {
        //   let timeout = 1000;
        //   setTimeout(() => {
        //     obj = personGenerator.next();
        //     console.log(obj);
        //     if (obj && typeof obj !== 'undefined' && typeof obj.value !== 'undefined') this.items.push(<ExpenseEntry>obj.value);
        //   }, timeout + 1000);
        // }

        this.itemCountStr = 'Total items = ' + count;
        this.oddPersons = this.items.filter((p : ExpenseEntry) => p.id % 2 != 0);
        this.personChange = new Observable<string> ((observer: Observer<string>) => {
        let index = Math.floor(Math.random() * this.items.length);
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
