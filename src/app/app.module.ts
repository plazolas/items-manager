import { BrowserModule } from '@angular/platform-browser';
import {NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ItemEntryComponent } from './expense-entry/item-entry.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemService } from './services/item.service';
import { DebugComponent } from './debug/debug.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ItemEntryEditComponent } from './expense-entry/item-entry-edit/item-entry-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './expense-entry/home/home.component';
import { NotfoundComponent } from './notfound.component';
import { AboutComponent } from './expense-entry/home/about/about.component';
import { LoginComponent } from './security/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import {SearchComponent} from './items-list/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemEntryComponent,
    ItemsListComponent,
    DebugComponent,
    ItemEntryEditComponent,
    HomeComponent,
    NotfoundComponent,
    AboutComponent,
    LoginComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ItemService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

