import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ItemEntryComponent } from './items/item-entry.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemService } from './services/item.service';
import { DebugComponent } from './debug/debug.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ItemEntryEditComponent } from './items/item-entry-edit/item-entry-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './security/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { SearchComponent } from './items-list/search/search.component';
import { ArtistsComponent } from './artists/artists.component';
import { AsteriscPipe } from './utils/Pipes/AsteriscPipe';
import { RouterModule } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { CountyentryComponent } from './country/countyentry/countyentry.component';

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
    SearchComponent,
    ArtistsComponent,
    AsteriscPipe,
    CountryComponent,
    CountyentryComponent
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

