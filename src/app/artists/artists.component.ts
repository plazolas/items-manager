import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

import {CookieService} from 'ngx-cookie-service';
import {DebugService} from '../services/debug.service';
import {UserService} from '../services/user.service';
import {ArtistService} from '../services/artist.service';
import {AppArtist} from '../model/app-artist';
import {AppArtistList} from '../model/app-artist-list';

@Component({
    selector: 'app-artists',
    templateUrl: './artists.component.html',
    styleUrls: ['./artists.component.css']
})

export class ArtistsComponent implements OnInit {
    title = 'Artists';
    artistForm: FormGroup;
    artistname: FormControl;
    artistid: FormControl;
    myName = this.constructor.name;
    artist: AppArtist = {} as AppArtist;
    artistRaw = 'none';
    artists: AppArtist[] = [];
    artistsRaw = '';
    jsonObj: any;
    art: any;
    paramName = this.activatedRoute.snapshot.params.artistname;
    paramId = this.activatedRoute.snapshot.params.artistid;

//////////////////////////////////////////////////////////////////////////    construct   ////////////////////////////
    constructor(private debugService: DebugService,
                private http: HttpClient,
                private activatedRoute: ActivatedRoute,
                private cookieService: CookieService,
                private router: Router,
                private userService: UserService,
                private artistService: ArtistService
    ) {
        // create form controls and group
        this.artistname = new FormControl('');
        this.artistid = new FormControl('');
        this.artistForm = new FormGroup({
            artistname: this.artistname,
            artistid: this.artistid
        });
    }

    //////////////////////////////////////////////////////////////////////////////////////////////  onInit  ///////////////////
    async ngOnInit() {
        if (this.paramName !== undefined) {
            console.log('paramName: ' + this.paramName);
            this.paramName = this.activatedRoute.snapshot.params.artistname.valueOf();
            this.getArtistByName(this.paramName);
        }
        if (this.paramId !== undefined) {
            console.log('paramId: ' + this.paramId);
            this.paramId = this.activatedRoute.snapshot.params.artistid.valueOf();
            this.artist = this.getArtistById(this.paramId);
        }
    }

    getArtistByName(name: string): void {
        this.artistService.getArtistsByName(name)
            .subscribe((data) => {
                const list = data as AppArtistList;
                this.artists = list.artists;
                this.artistsRaw = JSON.stringify(data);
            });
    }

    getArtistBySid(id: string): AppArtist {
        this.artistService.getArtistBySid(id)
            .subscribe({
                next: (data) => {
                    this.artist = data as AppArtist;
                    this.artistRaw = JSON.stringify(this.artist);
                    this.jsonObj = JSON.parse(this.artistRaw);
                    for (const prop in this.jsonObj) {
                        if (this.jsonObj.hasOwnProperty(prop)) {
                           // this.art[prop] = (this.jsonObj[prop] === 'undefined') ? null : this.jsonObj[prop];
                           // console.log(prop)
                        }
                    }
                    this.artistsRaw = JSON.stringify(this.art);
                },
                error: (err: any) => {
                    console.log(err);
                },
                complete: () => {
                }
            });
        return this.artist;
    }

    getArtistById(id: number): AppArtist {
        this.artistService.getArtistById(id)
            .subscribe({
                next: (data) => {
                    this.artist = data as AppArtist;
                    this.artistRaw = JSON.stringify(this.artist);
                    this.jsonObj = JSON.parse(this.artistRaw);
                    for (const prop in this.jsonObj) {
                        if (this.jsonObj.hasOwnProperty(prop)) {
                            // this.art[prop] = (this.jsonObj[prop] === 'undefined') ? null : this.jsonObj[prop];
                            // console.log(prop)
                        }
                    }
                    this.artistsRaw = JSON.stringify(this.art);
                },
                error: (err: any) => {
                    console.log(err);
                },
                complete: () => {
                }
            });
        return this.artist;
    }

    getArtistObj(id: number): AppArtist {
        this.artistService.getArtistById(id)
            .subscribe({ next: res => {
                const r = res as HttpResponse<AppArtist>
                this.artist = r.body as AppArtist;
            }});
        return this.artist;
    }

    onClickSubmit() {
        if(this.artistname.value && this.artistname.value.length > 0) {
            this.getArtistByName(this.artistname.value);
        }
    }

    clickedArtist(id: string) {
        if(id.length > 0) {
                this.getArtistBySid(id)
        }
    }
}
