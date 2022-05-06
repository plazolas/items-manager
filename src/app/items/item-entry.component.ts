import {
  Component, OnInit, OnChanges, SimpleChanges,
  Input, Output, EventEmitter,
} from '@angular/core';
import { Item } from '../model/item';
import { ItemService } from '../services/item.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-item-entry',
  templateUrl: './item-entry.component.html' ,
  styleUrls: ['./item-entry.component.css'],
  exportAs: 'NgForm'
})

export class ItemEntryComponent implements OnInit, OnChanges {
  title = 'Item Entry';

  @Input() person: Item = {} as Item;
  @Input() submitted = false;
  @Output() getSubmitStatusChange = new EventEmitter<boolean>();

  constructor(private itemService: ItemService, 
              private cookieService: CookieService,
              private userService: UserService,
              private router: Router) {
    if (!this.cookieService.check('token')) {
      this.router.navigate(['/login']);
    } 
  }

  ngOnInit() {}

  // personChanges.prop contains the old and the new value...
  ngOnChanges(personChanges: SimpleChanges) {
    if (personChanges.person && !personChanges.person.firstChange && personChanges.person.previousValue !== 'undefined') {
      // console.log(this.constructor.name + '::' + this.ngOnChanges.name + ' changes :');
      // console.log(personChanges);
    }
    // personChanges.prop contains the old and the new value...
  }
  
  onSubmit() {
    this.submitted = true;
    this.itemService.updateItem(this.person)
      .subscribe( data => { this.person = data as Item; },
                  err  => { console.log( 'updateItem error:' + err); },
                ()  => this.getSubmitStatusChange.emit(true)
      );

  }

}
