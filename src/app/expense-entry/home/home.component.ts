import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {ItemService} from '../../services/item.service';
import {debounceTime, distinctUntilChanged, Observable, switchMap} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    
 wandUrl = environment.wandUrl;
 backUrl = environment.backEndUrl;
 searchTerm = '';

 constructor(private itemsService: ItemService) {}

  ngOnInit() {
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
                resp.forEach( i => {
                    strArr.push(i);
                    console.log(i);
                });
                console.log(strArr)
                return [];
            })
        )
    }

}
