import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ItemEntryEditComponent} from './expense-entry/item-entry-edit/item-entry-edit.component';
import {ItemsListComponent} from './items-list/items-list.component';
import {NotfoundComponent} from './notfound.component';
import {HomeComponent} from './expense-entry/home/home.component';
import {AboutComponent} from './expense-entry/home/about/about.component';
import { environment } from '../environments/environment';
// import { CommonModule } from '@angular/common'; // no longer needed once rout

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'edit_item/:itemid', component:  ItemEntryEditComponent },
  { path: 'list_items', component:  ItemsListComponent },
  { path: 'list_items/:itemid', component:  ItemsListComponent },
  { path: 'home', component:  HomeComponent },
  { path: 'about', component:  AboutComponent },
  { path: 'wand', redirectTo: environment.https + '://' + environment.domain + environment.phpEndPoint + '/wand/index.php' },
  { path: '404', component: NotfoundComponent},
  { path: '**', redirectTo: '/404'}
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
