import {async, ComponentFixture, fakeAsync, inject, TestBed} from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { BasicInfo } from '../../models/basic-info/basic-info';
import { of } from 'rxjs';
import { Issue } from '../../models/issue/issue';
import { SearchService } from '../../services/search/search.service';
import { BasicInfoComponent } from '../basic-info/basic-info.component';
import { SearchInputComponent } from '../search-input/search-input.component';
import { IssuesComponent } from '../issues/issues.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserModule, By} from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let searchService: SearchService;

  beforeEach(async(() => {

    // SearchService stub
    const searchServiceStub = {
      getBasicInfo: () => of(
        new BasicInfo(
          1,
          1,
          'fullName',
          'url',
          'description',
          'forksUrl',
          1,
          'issuesUrl',
          1,
          'stargazersUrl',
          1,
          'commitsUrl',
          'owner',
          'name'
        )
      ),
      getIssues: () => of(
        [[new Issue(
          'url',
          1,
          'title',
          'userUrl',
          'state',
          new Date('2019-04-19T09:44:15+00:00'),
          new Date('2019-04-19T09:44:15+00:00'),
          'userLogin',
          'description',
          'userAvatarUrl',
        )], '10']
      )
    };

    TestBed.configureTestingModule({
      declarations: [ HomeComponent, BasicInfoComponent, SearchInputComponent, IssuesComponent ],
      providers: [ {
        provide: SearchService, useValue: searchServiceStub },
        HttpClientModule,
        { provide: ActivatedRoute, useValue: { params: of({ author: 'author', repositoryName: 'repositoryName' }), snapshot: {}}}
      ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        RouterTestingModule,
        NgxPaginationModule,
        NgHttpLoaderModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    searchService = TestBed.get(SearchService);

    fixture.detectChanges();
  });

  // Tests if the component was created correctly
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Tests if the basic information retrieved from the SearchService is correct and
  // that is fetched after an event is triggered by the SearchInputComponent
  it('should receive basic info content from SearchService', () => {
    const searchInputComponent = fixture.debugElement.query(By.directive(SearchInputComponent));
    searchInputComponent.triggerEventHandler('onNameTyped', 'repository');

    fixture.whenStable().then(() => {
      expect(component.basicInfo).toEqual(
      new BasicInfo(
          1,
          1,
          'fullName',
          'url',
          'description',
          'forksUrl',
          1,
          'issuesUrl',
          1,
          'stargazersUrl',
          1,
          'commitsUrl',
          'owner',
          'name'
        )
      );
    });
  });

  // Tests if the repositoryName property is initialized properly with the value sent by the event triggered in SearchInputComponent
  it ('should initializes the repositoryName attribute after receiving it from SearchInputComponent', () => {

    const searchInputComponent = fixture.debugElement.query(By.directive(SearchInputComponent));
    searchInputComponent.triggerEventHandler('onNameTyped', 'repository');
    expect(component.repositoryName).toEqual('repository');

  });

  // Tests that the getBasicInfo function is called, after the repositoryName property is initialized with the value
  // coming from the event triggered by the SearchInputComponent
  it ('should call getBasicInfo() after receiving the repositoryName', async(() => {
    spyOn(component, 'getBasicInfo');

    const searchInputComponent = fixture.debugElement.query(By.directive(SearchInputComponent));
    searchInputComponent.triggerEventHandler('onNameTyped', 'repository');

    fixture.whenStable().then(() => {
      expect(component.getBasicInfo).toHaveBeenCalled();
    });

  }));
});
