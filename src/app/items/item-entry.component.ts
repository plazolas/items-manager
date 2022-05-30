import {
    Component, OnInit, OnChanges, SimpleChanges,
    Input, Output, EventEmitter,
} from '@angular/core';
import {Item} from '../model/item';
import {ItemService} from '../services/item.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {throwError} from 'rxjs';

@Component({
    selector: 'app-item-entry',
    templateUrl: './item-entry.component.html',
    styleUrls: ['./item-entry.component.css'],
    exportAs: 'NgForm'
})

export class ItemEntryComponent implements OnInit, OnChanges {
    title = 'Item Entry';

    @Input() childItem: Item = {} as Item;
    @Input() childSubmitted = false;
    @Output() getSubmitStatusChange = new EventEmitter<boolean>();
    
    nameChanged = false;
    
    constructor(private itemService: ItemService,
                private cookieService: CookieService,
                private userService: UserService,
                private router: Router) {
        if (!this.cookieService.check('token')) {
            this.router.navigate(['/login']).then();
        }
    }

    ngOnInit() {
        // console.log(this.childItem) childItem is empty at this point.
    }

    // personChanges.prop contains the old and the new value...
    ngOnChanges(personChanges: SimpleChanges) {
        if (personChanges.person && !personChanges.person.firstChange && personChanges.person.previousValue !== 'undefined') {
            // console.log(this.constructor.name + '::' + this.ngOnChanges.name + ' changes :');
            // console.log(personChanges);
        }
        // personChanges.prop contains the old and the new value...
    }

    onNameChange() {
        this.nameChanged = true;
    }

  onSubmit() {
      this.childSubmitted = true;
      this.itemService.updateItemObs(this.childItem)
          .subscribe({
              next: data => { this.childItem = data as Item; console.log(data) },
              error: (err) => { console.log(err)},
              complete: () => {
                    this.getSubmitStatusChange.emit(true)
              }
          });
  }
}
