import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ItemEntryEditComponent} from './expense-entry/item-entry-edit/item-entry-edit.component';
import {ItemsListComponent} from './items-list/items-list.component';
import {NotfoundComponent} from './notfound.component';
import {HomeComponent} from './expense-entry/home/home.component';
// import { CommonModule } from '@angular/common'; // no longer needed once rout

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'edit_person', component:  ItemEntryEditComponent },
  { path: 'edit_list', component:  ItemsListComponent },
  { path: 'home', component:  HomeComponent },
  { path: '404', component: NotfoundComponent},
  { path: '**', redirectTo: '/404'}
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
