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

    releasesStr = '';
    releases: AppRelease[] = [];
    tracks: AppRelease[] = [];
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
                    const tmp = list.releases
                    // const result = tmp.filter(r => r.barcode)
                    this.releases = tmp
                },
                error: (err: any) => {
                    console.log(err);
                },
                complete: () => {}
            });
    }

    getTracksByReleaseId(id: string) {
        // TODO: create media and tracks
        this.artistService.getTracksByReleaseId(id)
            .subscribe({
                next: (data) => {
                    const list = data as AppRelease
                    // const result = tmp.filter(r => r.barcode)p
                    console.log(this.tracks)
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
            this.getArtistByName(this.artistname.value);
        }
    }

    clickedArtist(id: string) {
        if(id.length > 0) {
            this.getArtistBySid(id)
            this.artists = []
        }
    }

    clickedRelease(id: string) {
        if(id.length > 0) {
            // this.getTracksByReleaseId(id)
            alert('Release ID:' + id)
        } else {
            alert('No release id found!')
        }
    }
}
