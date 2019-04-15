import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SearchService } from './services/search.service';
import { SearchInputComponent } from './models/search-input/search-input.component';
import { BasicInfoComponent } from './models/basic-info/basic-info.component';
import { HomeComponent } from './models/home/home.component';
import { IssuesComponent } from './models/issues/issues.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SearchInputComponent,
    BasicInfoComponent,
    HomeComponent,
    IssuesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [SearchService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
