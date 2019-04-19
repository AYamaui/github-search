import {async, fakeAsync, flushMicrotasks, inject, TestBed, tick} from '@angular/core/testing';

import { SearchService } from './search.service';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { HomeComponent } from '../../components/home/home.component';
import { BasicInfoComponent } from '../../components/basic-info/basic-info.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { IssuesComponent } from '../../components/issues/issues.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('SearchService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let searchService: SearchService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [HomeComponent, BasicInfoComponent, SearchInputComponent, IssuesComponent],
      imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        RouterTestingModule,
        NgxPaginationModule,
        NgHttpLoaderModule.forRoot(),
        HttpClientTestingModule
      ],
      providers: [ SearchService, HttpTestingController, HttpClient ]
    }).compileComponents();

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    searchService = TestBed.get(SearchService);
  });

  // Tests if the service is created correctly
  it('should be created', () => {
    const service: SearchService = TestBed.get(SearchService);
    expect(service).toBeTruthy();
  });

  // Tests if the HTTP request retrieves the basic info correctly
  it('should receive the basic information when the request is sent',
    () => {

      const mockBasicInfoResponse: object = {
        "items": [
          {
            "url": "url",
            "id": "1",
            "title": "title",
            "user": {
              "html_url": "html_url",
              "login": "user_login",
              "avatar_url": "avatar_url"
            },
            "state": "state",
            "created_at": "2019-04-19T09:44:15+00:00",
            "updated_at": "2019-04-19T09:44:15+00:00"
          }
        ]
      };

      // HTTP request
      searchService.getBasicInfo( 'repositoryName' ).subscribe( ( searchResults: object ) => {
        expect(searchResults).toEqual(mockBasicInfoResponse);
      });

      // const req = httpTestingController.expectOne('https://api.github.com/search/repositories?q=repositoryName');
      // // Assert that the request is a GET.
      // expect(req.request.method).toEqual('GET');
      //
      // // Respond with mock data, causing Observable to resolve.
      // // Subscribe callback asserts that correct data was returned.
      // req.flush(mockBasicInfoResponse);
      //
      // // Finally, assert that there are no outstanding requests.
      // httpTestingController.verify();
    }
  );

  // Tests if the HTTP request retrieves the issues correctly
  it('should receive the issues when the request is sent', async (() => {
    const mockIssuesResponse: object = {
        "total_count": 1,
        "items": [
          {
            "url": "url",
            "id": "id",
            "title": "title",
            "user": {
              "html_url": "html_url",
              "avatar_url": "avatar_url",
              "login": "login"
            },
            "state": "state",
            "created_at": "created_at",
            "updated_at": "updated_at",
            "body": "body"
          }
        ]
      };

    // HTTP GET request
    searchService.getIssues( 'repositoryName', 1 ).subscribe( ( searchResults: object ) => {
      expect(searchResults).toEqual(mockIssuesResponse);
    });

    // const req = httpTestingController.
    //   expectOne('https://api.github.com/search/issues?q=repo:repositoryFullName&page=1&sort=updated&order=desc');
    //
    // // Assert that the request is a GET.
    // expect(req.request.method).toEqual('GET');
    //
    // // Respond with mock data, causing Observable to resolve.
    // // Subscribe callback asserts that correct data was returned.
    // req.flush(mockIssuesResponse);
    //
    // // Finally, assert that there are no outstanding requests.
    // httpTestingController.verify();
  }));
});
