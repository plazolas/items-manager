import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {ItemService} from '../services/item.service';
import {debounceTime, distinctUntilChanged, Observable, switchMap} from 'rxjs';
import {Location} from '@angular/common';
import {AppRoutingModule} from '../app-routing.module';

// declare var squareDigits: any;
// declare var f: any;
// declare var g: any;
declare var liveForest: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    wandUrl = environment.wandUrl;

    constructor(private itemsService: ItemService, private location: Location, private routing: AppRoutingModule) {
    }

    ngOnInit() {
        // this.routing.router.navigate(['/news']).then();
    }

    testJs(){
        // liveForest();
    }
 
    search(text$: Observable<string>): Observable<string[]> {
        return text$.pipe(
            distinctUntilChanged(),
            debounceTime(200),
            switchMap(searchTerm => {
                const strArr: string[] = [];
                if (!searchTerm || searchTerm.length < 2) {
                    return [];
                }
                const resp = this.itemsService.getItemsBySearchTerm(searchTerm);
                resp.forEach(i => {
                    strArr.push(i);
                    console.log(i);
                });
                console.log(strArr)
                return [];
            })
        )
    }

}
