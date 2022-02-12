import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ExpenseEntryEditComponent} from "./expense-entry/expense-entry-edit/expense-entry-edit.component";
import {ExpenseEntryListComponent} from "./expense-entry-list/expense-entry-list.component";
import {NotfoundComponent} from "./notfound.component";
import {HomeComponent} from "./expense-entry/home/home.component";
// import { CommonModule } from '@angular/common'; // no longer needed once rout

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'edit_person', component:  ExpenseEntryEditComponent },
  { path: 'edit_list', component:  ExpenseEntryListComponent },
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
