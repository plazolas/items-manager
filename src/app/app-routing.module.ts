import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import {Router, RouterModule, Routes} from '@angular/router';
import {ItemEntryEditComponent} from './items/item-entry-edit/item-entry-edit.component';
import {ItemsListComponent} from './items-list/items-list.component';
import {NotfoundComponent} from './notfound.component';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {LoginComponent} from './security/login/login.component';
import {SearchComponent} from './items-list/search/search.component';
import {ArtistsComponent} from './artists/artists.component';
import {CountryComponent} from './country/country.component';
import {NewsComponent} from './news/news.component';
import {LandscapeComponent} from './landscape/landscape.component';

const routes: Routes = [
  { path: 'home', component:  HomeComponent},
  { path: 'country', component:  CountryComponent },
  { path: 'country/:id', component:  CountryComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'edit_item/:itemid', component:  ItemEntryEditComponent },
  { path: 'list_items', component:  ItemsListComponent },
  { path: 'list_items/:itemid', component:  ItemsListComponent },
  { path: 'about', component:  AboutComponent },
  { path: 'search', component:  SearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'wand', redirectTo: environment.wandUrl },
  { path: 'artists', component: ArtistsComponent },
  { path: 'news', component: NewsComponent },
  { path: 'landscape', component: LandscapeComponent },
  { path: '404', component: NotfoundComponent},
  { path: '**', redirectTo: '/404'}
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
    scrollOffset: [0, 64]
  }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
  public router: Router;
  constructor(private myRouter: Router) {
    this.router = myRouter
  }
}
