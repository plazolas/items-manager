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
import {CommonUtils} from '../utils/commonUtils';

@Component({
    selector: 'app-items-list',
    templateUrl: './items-list.component.html',
    styleUrls: ['./items-list.component.css']
})

export class ItemsListComponent implements OnInit {
    title = 'Employees';
    myName = this.constructor.name;
    employee: Item = {} as Item;
    person: Item = {} as Item;
    item: Item = {} as Item;

    items: Item[] = [];
    bestItems: Item[] = [];
    birthItems: Item[] = [];
    submit = false;
    lastId = 0;
    dateStr: string = new Date().toString();
    newDateStr = '';
    latestDateStr = '';
    httpOptions = {};
    
    pageNo = 0;
    sortBy = 'country';
    pageSize = 10;

    itemsEntries: object = {};
    
    numbers: number[] = [];

    timeChange = new Observable<string>((observer: Observer<string>) => {
        setInterval(() => observer.next(
            new Date().toString()), 1000);
    });

    itemObservable$: Observable<string> = new Observable<string>();
    personChange$: Observable<string> | null = null;

    paramId = this.activatedRoute.snapshot.params.itemid;
    token = '';

//////////////////////////////////////////////////////////////////////////    construct   ////////////////////////////
    constructor(private debugService: DebugService,
                private itemService: ItemService,
                private countryService: CountryService,
                private http: HttpClient,
                private activatedRoute: ActivatedRoute,
                private cookieService: CookieService,
                private router: Router,
                private userService: UserService
    ) {
        if (!this.cookieService.check('token')) {
            this.router.navigate(['/login']).then();
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
                        console.log(err);
                        alert(err.error);
                    }
                }
            });
    }
    
    //////////////////////////////////////////////////////////////////////////////////////////////  onInit  ///////////////////
    async ngOnInit() {
        this.getAllItems();
        
        const lid  = await this.fetchLastId();
        await this.loadItem(lid === undefined ? 139 : lid);
        
        // const countriesObs = this.getCountries();
        // const personsObs = this.getPersons();

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
            mergeMap(item => {
                return countryObs.pipe(
                    map((country) => {
                        let i = Math.round(100 * ran);
                        const p = item as Item;
                        const c = country as AppCountry;
                        const passport = {
                            id: i++,
                            number: Math.round(100000000 * ran),
                            expDate: Date.now(),
                            country: c.id,
                            itemId: p.id,
                            itemName: p.lastname
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
                this.itemObservable$ = from(item);});
        // const mapObjToString = map( (obj : Object) => JSON.stringify(obj) );
    }
    
     refreshList(refresh: boolean, item: Item) {
            this.getAllItems();
            this.item = this.getItemObj(item.id)
            this.submit = false;

    }
    getNextPage() {
        this.pageNo++;
        this.getAllItems();
    }
    getBackPage() {
        this.pageNo--;
        this.getAllItems()
   }
 
    ///////////////////////// ///////////////////////////////////////////  getAllItems
    getAllItems() {
        let ajaxResponse: AjaxResponse<Item>;

        const api$ = ajax({
            url: environment.backEndUrl + '/api/vi/person/paged?pageNo=' + this.pageNo + '&sortBy=' + this.sortBy,
            method: 'GET',
            headers: {Authorization: 'Bearer ' + this.token },
            body: {}
        });
        
        const ajaxObserver = {
            next: (res: any) => {
                this.items = res.response;
                ajaxResponse = res;
            },
            error: (err: any) => console.log(err),
            complete: () => {

                // for (const p of this.bestItems) {
                //     this.items.push(p as Item);
                // }

                // TODO study function* iterators to make iterables
                // yield* is an operator that is only available inside generators. 
                // It yields all items iterated over by an iterable.

                // example use of iterator
                let itemsIterable = this.items[Symbol.iterator]();
                let result = itemsIterable.next();
                while (!result.done) {
                    if (result.value.lastname.includes('a') && result.value.age > 0) {
                        this.bestItems.push(result.value);
                    }
                    result = itemsIterable.next();
                }

                // example use of creating and using iterator function
                itemsIterable = this.items[Symbol.iterator]();
                function* birthIterator() {
                    let itr = itemsIterable.next();
                    while (!itr.done) {
                        if (itr.value.age > 39) {
                            yield itr.value;
                        }
                        itr = itemsIterable.next();
                    }
                }
                
                for (const item of birthIterator()) {
                    this.birthItems.push(item);
                    // example use of ng class
                    CommonUtils.removeProp(item, 'passport');
                }

            }
        };
        api$.subscribe(ajaxObserver);

    }
    public navigateToSection(section: string) {
        window.location.hash = '';
        window.location.hash = section;
    }

}
