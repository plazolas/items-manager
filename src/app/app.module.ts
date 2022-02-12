import { BrowserModule } from '@angular/platform-browser';
import {NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ItemEntryComponent } from './expense-entry/item-entry.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { ExpenseEntryService } from './services/expense-entry.service';
import { DebugComponent } from './debug/debug.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ItemEntryEditComponent } from './expense-entry/item-entry-edit/item-entry-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './expense-entry/home/home.component';
import { NotfoundComponent } from './notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemEntryComponent,
    ItemsListComponent,
    DebugComponent,
    ItemEntryEditComponent,
    HomeComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ExpenseEntryService],
  bootstrap: [AppComponent]
})
export class AppModule { }

