import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DebugService} from '../services/debug.service';
import { ViewportScroller } from '@angular/common'
import {ResBody} from '../model/res-body';
import {ContactService} from '../services/contact.service';

@Component({
    selector: 'app-news',
    templateUrl: './landscape.component.html',
    styleUrls: ['./landscape.component.css']
})

export class LandscapeComponent implements OnInit {
    title = 'Yardwork Professional';
    contactName = '';
    phone = '';
    contactEmail = '';

    constructor(private debugService: DebugService,
                private viewportScroller: ViewportScroller,
                private contactService: ContactService
    ) {
    }

    async ngOnInit() {
        document.title = this.title;
    }

    onClick(elementId: string): void { this.viewportScroller.scrollToAnchor(elementId); }


    onSubmit() {
        this.contactService.addContact(this.contactName, this.contactEmail, this.phone)
            .subscribe({
                next: (response: ResBody) => {
                    alert('Thank you ' + this.contactName + '! We will contact you shortly!');
                    this.contactName = '';
                    this.phone = '';
                    this.contactEmail = '';
                },
                error: error => {
                    alert('Thank you ' + this.contactName + '! We got your information!');
                    console.log(error);
                }
            });
    }
}
