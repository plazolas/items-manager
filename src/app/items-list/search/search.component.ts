import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {debounceTime, distinctUntilChanged, fromEvent, map, Observable, of, tap} from 'rxjs';
import {ItemService} from '../../services/item.service';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    @ViewChild('searchTerm', {static: true}) searchTerm!: ElementRef;
    apiResponse: any;
    isSearching: boolean;

    constructor(private httpClient: HttpClient, private itemService: ItemService) {
        this.isSearching = false;
        this.apiResponse = { Response: false, error: '' };
    }

    ngOnInit() {

        fromEvent(this.searchTerm.nativeElement, 'keyup')
            .pipe(
                map((event: any) => {
                    return event.target.value;
                }),
                filter(res => res.length > 1),
                debounceTime(200),
                distinctUntilChanged()
            )
            .subscribe((text: string) => {
            this.isSearching = true;
            this.searchGetCall(text)
                .subscribe({
                    next: (data: string[]) => {
                        if (data === undefined) return {Response: 'true', items: []}
                        this.apiResponse = {Response: 'true', items: data};
                    }, 
                    error:  (err: any) => {
                        this.apiResponse = {Response: 'false', error: err};
                        console.log('error', err);
                    }});
            this.isSearching = false;
        });
    }

    searchGetCall(term: string): Observable<string[]> {
        if (term === '') {
            return of([]);
        }
        return of(this.itemService.getItemsBySearchTerm(term))
    }

}
