import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

import {DebugService} from '../services/debug.service';
import {UserService} from '../services/user.service';
import {ArtistService} from '../services/artist.service';
import {AppArtist} from '../model/app-artist';
import {AppArtistList} from '../model/app-artist-list';
import {AppRelease} from '../model/app-release';
import {AppReleasesList} from '../model/app-releases-list';
import {AppMedia} from '../model/app-media';
import {AppTrack} from '../model/app-track';

@Component({
    selector: 'app-artists',
    templateUrl: './artists.component.html',
    styleUrls: ['./artists.component.css']
})

export class ArtistsComponent implements OnInit {
    title = 'Music at DevenZone';
    artistForm: FormGroup;
    artistname: FormControl;
    artistid: FormControl;
    myName = this.constructor.name;
    artist: AppArtist = {} as AppArtist;
    artistRaw = 'none';
    artists: AppArtist[] = [];
    artistsRaw = '';
    releases: AppRelease[] = [];
    release: AppRelease = {} as AppRelease;
    media: AppMedia = {} as AppMedia;
    tracks: AppTrack[] = []
    jsonObj: any;
    art: any;
    paramName = this.activatedRoute.snapshot.params.artistname;
    paramId = this.activatedRoute.snapshot.params.artistid;

//////////////////////////////////////////////////////////////////////////    construct   ////////////////////////////
    constructor(private debugService: DebugService,
                private http: HttpClient,
                private activatedRoute: ActivatedRoute,
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
        document.title = this.title;
        if (this.paramName !== undefined) {
            console.log('paramName: ' + this.paramName);
            this.paramName = this.activatedRoute.snapshot.params.artistname.valueOf();
            this.getArtistByName(this.paramName);
        } else {
            this.getArtistBySid('56a92a20-c973-4866-9dee-8af77d646ba0');
        }
        if (this.paramId !== undefined) {
            console.log('paramId: ' + this.paramId);
            this.paramId = this.activatedRoute.snapshot.params.artistid.valueOf();
            this.artist = this.getArtistById(this.paramId);
        } else {
            // this.getArtistBySid('56a92a20-c973-4866-9dee-8af77d646ba0');
        }
    }

    getArtistByName(name: string): void {
        this.artistService.getArtistsByName(name)
            .subscribe((data) => {
                const list = data as AppArtistList;
                this.artists = list.artists;
            });
    }

    getArtistBySid(id: string) {
        this.artistService.getArtistBySid(id)
            .subscribe({
                next: (data) => {
                    this.artist = data as AppArtist;
                },
                error: (err: any) => {
                    console.log(err);
                },
                complete: () => {
                }
            });
        this.artistService.getReleasesByArtistsId(id)
            .subscribe({
                next: (data) => {
                    const list = data as AppReleasesList
                    this.releases = list.releases
                },
                error: (err: any) => {
                    console.log(err);
                },
                complete: () => {}
            });
    }

    getMediaByReleaseId(id: string) {
        this.artistService.getMediaByReleaseId(id)
            .subscribe({
                next: (data) => {
                    this.release = data as AppRelease
                    this.media = this.release.media[0]
                    this.tracks = this.media.tracks;
                },
                error: (err: any) => {
                    console.log(err);
                },
                complete: () => {
                }
            });
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
            this.artist = {} as AppArtist
            this.artists = []
            this.releases = []
            this.tracks = []
            this.getArtistByName(this.artistname.value);
        }
    }

    clickedArtist(id: string) {
        if(id.length > 0) {
            this.artists = []
            this.artist = {} as AppArtist
            this.release = {} as AppRelease
            this.releases = []
            this.tracks = []
            this.getArtistBySid(id)
        }
    }

    clickedRelease(id: string) {
        if(id.length > 0) {
            this.releases = []
            this.tracks = []
            this.getMediaByReleaseId(id)
        } else {
            alert('No release id found!')
        }
    }
}
