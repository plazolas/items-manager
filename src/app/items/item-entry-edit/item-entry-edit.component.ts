import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Item} from '../../model/item';
import {ItemService} from '../../services/item.service';
import {ActivatedRoute} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from '../../services/user.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs';

@Component({
    selector: 'app-item-entry-edit',
    templateUrl: './item-entry-edit.component.html',
    styleUrls: ['./item-entry-edit.component.css']
})
export class ItemEntryEditComponent implements OnInit {
    errorStr = '';
    title = 'Edit Item';
    itemId = 0;
    loaded = false;
    params = this.activatedRoute.snapshot.params;
    token = '';
    httpOptions = {};
    @Input() person: Item = {} as Item;
    @Input() submitted = false;
    @Output() submitChange = new EventEmitter<boolean>();

    constructor(private itemService: ItemService, private router: Router, private activatedRoute: ActivatedRoute,
                private cookieService: CookieService, private userService: UserService) {
        if (!this.cookieService.check('token')) {
            this.router.navigate(['/login']).then();
        }
        this.token = this.userService.getToken();
        this.httpOptions = this.userService.getHeaders();
        this.getItemById();
    }

    ngOnInit() {
    }

    isLoading(): boolean {
        return this.loaded;
    }

    onSubmit() {
        this.itemService.updateItem(this.person)
            .subscribe(data => {
                    this.person = data as Item;
                },
                err => {
                    console.log(err);
                },
                () => {
                    this.submitChange.emit(true);
                    this.router.navigate(['/list_items'])
                }
            );

    }

    getItemById() {
        if (Object.keys(this.params).length === 0 && !this.params.hasOwnProperty('itemid')) {
            this.router.navigate(['/list_items']);
        } else {
            this.itemId = this.activatedRoute.snapshot.params.itemid.valueOf();
            this.itemService.getItem(this.itemId)
                .subscribe(
                    {
                        next: r => {
                            const resp = r as HttpResponse<Item>;
                            if (resp.body !== null) {
                                this.person = resp.body as Item;
                            } else {
                                this.person = {} as Item;
                                this.errorStr = 'item not found';
                            }
                            this.loaded = true;
                        },
                        error: (err) => {
                            if (err instanceof HttpErrorResponse) {
                                console.log(err.error, err.message);
                                this.errorStr = err.message
                            }
                        }
                    });
        }
    }

}
  

