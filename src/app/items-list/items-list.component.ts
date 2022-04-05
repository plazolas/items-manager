import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ajax, AjaxResponse} from 'rxjs/ajax';
import {filter} from 'rxjs/operators';
import {Observable, Observer, from, fromEvent, noop} from 'rxjs';

import {DebugService} from '../services/debug.service';
import {ExpenseEntry} from '../model/expense-entry';
import {ExpenseEntryService} from '../services/expense-entry.service';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-items-list',
    templateUrl: './items-list.component.html',
    styleUrls: ['./items-list.component.css']
})

export class ItemsListComponent implements OnInit {
    title = 'Items list';
    myName = this.constructor.name;
    employee: ExpenseEntry = {} as ExpenseEntry;
    person: ExpenseEntry = {} as ExpenseEntry;
    item: ExpenseEntry = {} as ExpenseEntry;
    items: ExpenseEntry[] = [];
    submit = false;
    lastId = 0;
    dateStr: string = new Date().toString();
    newDateStr = '';
    latestDateStr = '';
    httpOptions = {}

    expenseEntries: object = {};
    expenseEntriesStr = '';

    filterFnByEvenNumbers = filter((n: number) => n % 2 === 0);
    filterFnByOddNumbers = filter((n: number) => n % 2 !== 0);

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

    timeChange = new Observable<string>((observer: Observer<string>) => {
        setInterval(() => observer.next(
            new Date().toString()), 1000);
    });

    itemObservable$: Observable<string> = new Observable<string>();

    personChange$: Observable<string> | null = null;
    oddPersons: ExpenseEntry[] = [];
    badPersons: ExpenseEntry[] = [];

    paramId = this.activatedRoute.snapshot.params.itemid;
    
    token = '';

    public testArgs(value: any): boolean {
        let res: boolean;
        if (arguments.length === 0) {
            res = false;
        } else if (arguments.length === 1) {
            res = (!(arguments[0] === null || typeof (arguments[0]) === 'undefined' || Object.keys(arguments[0]).length === 0));
        } else {
            res = true;
        }
        return res;
    }

    public removeProp(obj: any, prop: string): object | false {
        if (!(obj === null || typeof obj === 'undefined' || Object.keys(obj).length === 0 ||
            prop === null || prop === '' || typeof prop === undefined)) {
            return false;
        }
        if (obj !== null && obj.hasOwnProperty(prop)) {
            delete obj.prop;
            return obj;
        } else {
            return false;
        }
    }

    constructor(private debugService: DebugService,
                private expenseEntryService: ExpenseEntryService,
                private http: HttpClient,
                private activatedRoute: ActivatedRoute
    ) {
        // -----------------------------test area --------------------------------
        const x = {person: 'john doe', passport: '12345'};
        let y = this.removeProp(x, 'grand');
        // console.log(y);
        y = this.removeProp(x, 'passport');
        // console.log(y);
        // ---------------------------------------------------------------------------
        this.expenseEntryService.getAuth()
            .subscribe({
                next: resp => {
                    if (resp.body?.success && resp.body?.user.length > 0) {
                        this.token = resp.body.token;
                        this.expenseEntryService.setAuthHeaders(resp.body.token);
                        this.setAuthHeaders(resp.body.token);
                        this.showPersonsGrid();
                    }
                },
                error: (err) => { console.log(err); },
                complete: () => {}
            });
        
    }

    ngOnInit() {

        if (this.paramId !== undefined) {
            this.paramId = this.activatedRoute.snapshot.params.itemid.valueOf();
            this.item = this.getExpenseItemObj(this.paramId);
        }

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
        filteredNumbers.subscribe((num: number) => {
            this.filteredNumbers.push(num);
            this.val2 += num;
        });
        const processedNumbers = this.filterFnByOddNumbers(numbers$);
        processedNumbers.subscribe((num: number) => {
            this.processedNumbers.push(num);
            this.val3 += num;
        });
        const e = document.querySelector('#counter');
        if (e) {
            const clickEvent$ = fromEvent(e, 'click');
            clickEvent$.subscribe(() => this.counter++);
        }
        if (e) {
            const clickPersonEvent$ = fromEvent(e, 'click');
            clickPersonEvent$.subscribe(() => this.counter++);
        }
        // while(this.expenseEntryService.lastId === 0) {
        //     noop();
        // }
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
    }

    clickedDate(d: string): void {
        this.dateParser(d);
    }

    dateParser(str: string): void {
        this.newDateStr = new Date(Date.parse(str)).toString();
        this.latestDateStr = this.formattedDateStr(str);
    }

    formattedDateStr(str: string): string {
        const date = new Date(str);
        let dateStrArr = [];
        let newDateStr = str;
        if (date.toString() === 'Invalid Date') {
            return 'Invalid Date';
        }

        const regex = /[^A-Za-z0-9\s:]/;
        const found = str.match(regex);
        const separator: string = (found !== null) ? found[0] : '';
        if (separator !== '') {
            dateStrArr = str.split(separator);
            if (dateStrArr.length === 3) {
                const month = dateStrArr[0].padStart(2, '0');
                const day = dateStrArr[1].padStart(2, '0');
                let year = dateStrArr[2];
                if (year.length === 2) {
                    year = (parseInt(dateStrArr[2], 10) < 22) ? year.padStart(4, '20') : year.padStart(4, '19');
                }
                newDateStr = month + '-' + day + '-' + year + '    ' + year + month + day + '        ' + month + '/' + day + '/' + year;
            } else {
                newDateStr = str;
            }
        } else {
            newDateStr = str;
        }
        return newDateStr;
    }

    getItems(): void {
        this.expenseEntryService.getExpenseEntries()
            .subscribe(data => {
                this.expenseEntries = data;
                this.expenseEntriesStr += JSON.stringify(data) + '<br>';
            });
    }

    getPersonById(id: number): string {
        this.expenseEntryService.getExpenseEntry(id)
            .subscribe({
                next: data => {
                    this.item = data as ExpenseEntry;
                },
                error: (err) => {
                    console.log(err);
                },
                complete: () => {
                }
            });
        return JSON.stringify(this.item);
    }

    getEmployeeById(id: number): string {
        const itemStr = JSON.stringify(this.employee);
        this.expenseEntryService.getExpenseEntry(id)
            .subscribe({
                next: data => {
                    this.employee = data as ExpenseEntry;
                },
                error: (err) => {
                    console.log(err);
                },
                complete: () => {
                }
            });
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
            .subscribe(itm => {
                this.item = itm as ExpenseEntry;
                const item: string[] = [JSON.stringify(itm)];
                this.itemObservable$ = from(item);
            });
        // const mapObjToString = map( (obj : Object) => JSON.stringify(obj) );
        // const personal$ = from(this.personal);
        // personal$.subscribe(this.personalObservable);
        // const personalToString$ = personal$.pipe(mapObjToString);
    }

    clickedCounter() {
        this.counter++;
    }

    refreshList(refresh: boolean) {
        if (refresh) {
            this.showPersonsGrid();
            this.submit = false;
        }
    }

    showPersonsGrid() {
        this.personal = [];
        this.expenseEntryService.getLastIdObs()
            .subscribe(
                {
                    next: lid => {
                        if (lid > 0) {
                            this.lastId = lid;
                            this.expenseEntryService.getExpenseEntry(this.lastId)
                                .subscribe({
                                    next: itm => {
                                        this.item = itm as ExpenseEntry;
                                        this.itemObservable$ = from([JSON.stringify(this.item)]);
                                        const api$ = ajax({
                                            url: environment.backEndUrl + '/api/vi/person',
                                            method: 'GET',
                                            headers: {Authorization: 'Bearer ' + this.token },
                                            body: {}
                                        });
                                        api$.subscribe(ajaxObserver);
                                    }
                                });
                        }
                    },
                    error: (err) => { console.log(err); },
                    complete: () => {}
                }
            );
        

        let ajaxResponse: AjaxResponse<ExpenseEntry>;
        
        const ajaxObserver = {
            next: (res: any) => {
                this.personas = res.response;
                ajaxResponse = res;
            },
            error: (err: any) => console.log(err),
            complete: () => {
                this.personal = [];
                this.items = [];
                const itemArr: ExpenseEntry[] = [];
                let count = 0;

                for (const p of this.personas) {
                    count++;
                    if (count > 15) {
                        break;
                    }
                    this.items.push(p as ExpenseEntry);
                }
                // this.personas.forEach( p => {
                //         const item = p as ExpenseEntry;
                //         count++;
                //         **** wrong!!! if (count < 21) { this.items.push(item); }
                // });
                this.itemCountStr = 'Total items = ' + count;

                // TODO study function* iterators to make iterables
                // yield* is an operator that is only available inside generators. 
                // It yields all items iterated over by an iterable.

                const itemsIterable = this.items[Symbol.iterator]();
                let result = itemsIterable.next();
                while (!result.done) {
                    if (result.value.lastname.includes('n')) {
                        this.oddPersons.push(result.value);
                    }
                    result = itemsIterable.next();
                }

                const onOddItemsIterable = this.oddPersons[Symbol.iterator]();

                function* itemsIterator() {
                    let itr = onOddItemsIterable.next();
                    while (!itr.done) {
                        if (!itr.done && itr.value.lastname.includes('G')) {
                            yield itr.value;
                        }
                        itr = onOddItemsIterable.next();
                    }
                }

                const makeItemsIterable = itemsIterator();
                for (const p of makeItemsIterable) {
                    this.badPersons.push(p);
                }

            }
        };
    }

}
