import { BrowserModule } from '@angular/platform-browser';
import {NgModule, ChangeDetectorRef } from '@angular/core';

import { AppComponent } from './app.component';
import { ExpenseEntryComponent } from './expense-entry/expense-entry.component';
import { ExpenseEntryListComponent } from './expense-entry-list/expense-entry-list.component';
import { ExpenseEntryService } from './services/expense-entry.service';
import { DebugComponent } from './debug/debug.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ExpenseEntryEditComponent } from './expense-entry/expense-entry-edit/expense-entry-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HomeComponent } from './expense-entry/home/home.component';
import { NotfoundComponent } from './notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpenseEntryComponent,
    ExpenseEntryListComponent,
    DebugComponent,
    ExpenseEntryEditComponent,
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

