import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import {RouterModule, Routes} from '@angular/router';
import {ItemEntryEditComponent} from './items/item-entry-edit/item-entry-edit.component';
import {ItemsListComponent} from './items-list/items-list.component';
import {NotfoundComponent} from './notfound.component';
import {HomeComponent} from './items/home/home.component';
import {AboutComponent} from './items/home/about/about.component';
import {LoginComponent} from './security/login/login.component';
import {SearchComponent} from './items-list/search/search.component';
import {ArtistsComponent} from './artists/artists.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'edit_item/:itemid', component:  ItemEntryEditComponent },
  { path: 'list_items', component:  ItemsListComponent },
  { path: 'list_items/:itemid', component:  ItemsListComponent },
  { path: 'home', component:  HomeComponent },
  { path: 'about', component:  AboutComponent },
  { path: 'search', component:  SearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'wand', redirectTo: environment.wandUrl },
  { path: 'artists', component: ArtistsComponent },
  { path: '404', component: NotfoundComponent},
  { path: '**', redirectTo: '/404'}
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
