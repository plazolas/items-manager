import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {ajax, AjaxResponse} from 'rxjs/ajax';
import {concatAll, filter, mergeMap, take} from 'rxjs/operators';
import {Observable, Observer, from, fromEvent, noop, Subject, Subscription, interval, debounceTime, zip, map, forkJoin, concat} from 'rxjs';

import {CookieService} from 'ngx-cookie-service';
import {DebugService} from '../services/debug.service';
import {Item} from '../model/item';
import {ItemService} from '../services/item.service';
import {environment} from '../../environments/environment';
import {UserService} from '../services/user.service';
import {CountryService} from '../services/country-service';
import {AppPassport} from '../model/app-passport';
import {AppCountry} from '../model/app-country';

@Component({
    selector: 'app-items-list',
    templateUrl: './items-list.component.html',
    styleUrls: ['./items-list.component.css']
})

export class ItemsListComponent implements OnInit {
    title = 'Items list';
    myName = this.constructor.name;
    employee: Item = {} as Item;
    person: Item = {} as Item;
    item: Item = {} as Item;

    items: Item[] = [];
    submit = false;
    lastId = 0;
    dateStr: string = new Date().toString();
    newDateStr = '';
    latestDateStr = '';
    httpOptions = {};

    itemsEntries: object = {};

    filterFnByEvenNumbers = filter((n: number) => n % 2 === 0);
    filterFnByOddNumbers = filter((n: number) => n % 2 !== 0);

    numbers: number[] = [];

    personas: object[] = [];
    personal: object[] = [];
    itemCountStr = '';

    timeChange = new Observable<string>((observer: Observer<string>) => {
        setInterval(() => observer.next(
            new Date().toString()), 1000);
    });

    itemObservable$: Observable<string> = new Observable<string>();

    personChange$: Observable<string> | null = null;
    oddPersons: Item[] = [];
    badPersons: Item[] = [];

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
//////////////////////////////////////////////////////////////////////////    construct   ////////////////////////////
    constructor(private debugService: DebugService,
                private itemService: ItemService,
                private countryService: CountryService,
                private http: HttpClient,
                private activatedRoute: ActivatedRoute,
                private cookieService: CookieService,
                private router: Router,
                private userService: UserService,
                private httpClient: HttpClient
    ) {
        if (!this.cookieService.check('token')) {
            this.router.navigate(['/login']);
        }
        this.getTokeAndHeaders();
    }
    
    getToken()   { return this.userService.getToken() }
    getHeaders() { return this.userService.getHeaders() }

    getCountries() { return this.countryService.getCountries() }
    getPersons() { return this.itemService.getItems() }

    getCountry(id: number) { return this.countryService.getCountry(id) }
    getPerson(id: number) { return this.itemService.getItem(id) }

    getTokeAndHeaders() {
        this.token = this.getToken();
        this.httpOptions = this.getHeaders();
    }
    
    fetchLastId(): Promise<any> {
        return this.itemService.fetchLastId()
    }

    async loadItem(item: number) {
        this.itemService.getItem(item)
            .subscribe({
                next: (resp) => {
                    const r = resp as HttpResponse<Item>;
                    this.item = r.body as Item;
                    this.itemObservable$ = from([JSON.stringify(this.item)]);
                },
                error: (err) => {
                    if (err instanceof HttpErrorResponse) {
                        console.log(err.error, err.message);
                    }
                }
            });
    }
    
    //////////////////////////////////////////////////////////////////////////////////////////////  onInit  ///////////////////
    async ngOnInit() {
        this.getAllItems();
        
        const lid  = await this.fetchLastId();
        await this.loadItem(lid === undefined ? 139 : lid);
        
        const countriesObs = this.getCountries();
        const personsObs = this.getPersons();

        const countryObs = this.getCountry(19);
        const personObs = this.getPerson(166);
        
        // const forkObs = forkJoin({countries: countriesObs, persons: personsObs});
        // forkObs.subscribe(data => console.log(data))
        
        let ran: number = Math.round(10 * .5 * Math.random());
        ran = (ran === 0 ) ? 1 : ran;
        
        // const catObs = concat(
        //     countryObs,
        //     personObs
        // );
        // catObs.subscribe(data => console.log(data));
        
        const passportObs: Observable<object> = personObs.pipe(
            mergeMap(person => {
                return countryObs.pipe(
                    map((country) => {
                        let i = Math.round(100 * ran);
                        const p = person as Item;
                        const c = country as AppCountry;
                        const passport = {
                            id: i++,
                            number: Math.round(100000000 * ran),
                            expDate: Date.now(),
                            country: c.id,
                            personId: p.id,
                            personName: p.lastname
                        }
                        return passport;
                    })
                )
            })
        );
        // passportObs.subscribe( p => console.log(p))
        
        if (this.paramId !== undefined) {
            this.paramId = this.activatedRoute.snapshot.params.itemid.valueOf();
            this.item = this.getItemObj(this.paramId);
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
        this.itemService.getItems()
            .subscribe((data) => {
                this.itemsEntries = data;
            });
    }

    getPersonById(id: number): string {
        this.itemService.getItem(id)
            .subscribe({
                next: (data) => {
                    this.item = data as Item;
                },
                error: (err: any) => {
                    console.log(err);
                },
                complete: () => {
                }
            });
        return JSON.stringify(this.item);
    }

    getItemObj(id: number): Item {
        this.itemService.getItem(id)
            .subscribe({ next: res => {
                const r = res as HttpResponse<Item>
                this.item = r.body as Item;
            }});
        return this.item;
    }

    clickedPerson(event: any, id: number) {
        this.itemService.getItem(id)
            // .pipe(map(c => c as Item))
            .subscribe(res => {
                const r = res as HttpResponse<Item>;
                const itm = r.body;
                this.item =  itm as Item;
                const item: string[] = [JSON.stringify(itm)];
                this.itemObservable$ = from(item);
            });
        // const mapObjToString = map( (obj : Object) => JSON.stringify(obj) );
    }
    
    refreshList(refresh: boolean) {
        if (refresh) {
            this.getAllItems();
            this.item = this.getItemObj(172)
            this.submit = false;
        }
    }
 
    ///////////////////////// ///////////////////////////////////////////  getAllItems
    getAllItems() {
        this.personal = [];
        let ajaxResponse: AjaxResponse<Item>;

        const api$ = ajax({
            url: environment.backEndUrl + '/api/vi/person',
            method: 'GET',
            headers: {Authorization: 'Bearer ' + this.token },
            body: {}
        });
        
        const ajaxObserver = {
            next: (res: any) => {
                this.personas = res.response;
                ajaxResponse = res;
            },
            error: (err: any) => console.log(err),
            complete: () => {
                this.personal = [];
                this.items = [];
                const itemArr: Item[] = [];
                let count = 0;

                for (const p of this.personas) {
                    count++;
                    if (count > 15) {
                        break;
                    }
                    this.items.push(p as Item);
                }
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
        api$.subscribe(ajaxObserver);

    }

}
