import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SearchService } from './services/search/search.service';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { BasicInfoComponent } from './components/basic-info/basic-info.component';
import { HomeComponent } from './components/home/home.component';
import { IssuesComponent } from './components/issues/issues.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { StatisticsComponent } from './components/statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchInputComponent,
    BasicInfoComponent,
    HomeComponent,
    IssuesComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgHttpLoaderModule.forRoot()
  ],
  providers: [SearchService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
