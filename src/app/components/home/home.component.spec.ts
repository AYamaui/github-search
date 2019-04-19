import {async, ComponentFixture, fakeAsync, inject, TestBed} from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { BasicInfo } from '../../models/basic-info/basic-info';
import { DebugElement } from '@angular/core';
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

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let searchService: SearchService;

  beforeEach(async(() => {

    let searchServiceStub = {
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
          'commitsUrl'
        )
      ),
      getIssues: () => of(
        [[new Issue(
          'url',
          1,
          'title',
          'userUrl',
          'state',
          'createdAt',
          'updatedAt',
          'userLogin',
          'description',
          'userAvatarUrl',
        )], '10']
      )
    };

    TestBed.configureTestingModule({
      declarations: [ HomeComponent, BasicInfoComponent, SearchInputComponent, IssuesComponent ],
      providers: [ { provide: SearchService, useValue: searchServiceStub }, HttpClientModule ],
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive basic info content from SearchService', async(() => {
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
          'commitsUrl'
        )
      );
    });
  }));

  it('should receive the issues from SearchService', async(() => {
    spyOn(component, 'getIssues').and.callThrough();
    const basicInfoComponent = fixture.debugElement.query(By.directive(BasicInfoComponent));
    basicInfoComponent.triggerEventHandler('onIssuesClicked', {});

    expect(component.getIssues).toHaveBeenCalled();

    fixture.whenStable().then(() => {
      expect(component.issues).toEqual(
      [new Issue(
          'url',
          1,
          'title',
          'userUrl',
          'state',
          'createdAt',
          'updatedAt',
          'userLogin',
          'description',
          'userAvatarUrl',
        )]
      );
    });
  }));

  it('should receive more issues from SearchService', async(() => {
    spyOn(component, 'getIssues').and.callThrough();
    const issuesComponent = fixture.debugElement.query(By.directive(IssuesComponent));
    issuesComponent.triggerEventHandler('onLoadMoreIssues', {});

    expect(component.getIssues).toHaveBeenCalled();

    // fixture.whenStable().then(() => {
    //   expect(component.issues).toEqual(
    //   [new Issue(
    //       'url',
    //       1,
    //       'title',
    //       'userUrl',
    //       'state',
    //       'createdAt',
    //       'updatedAt',
    //       'userLogin',
    //       'description',
    //       'userAvatarUrl',
    //     )]
    //   );
    // });
  }));

  it ('should initializes the repositoryName attribute after receiving it from SearchInputComponent', () => {

    const searchInputComponent = fixture.debugElement.query(By.directive(SearchInputComponent));
    searchInputComponent.triggerEventHandler('onNameTyped', 'repository');
    expect(component.repositoryName).toEqual('repository');

  });

  it ('should call getBasicInfo() after receiving the repositoryName', async(() => {
    spyOn(component, 'getBasicInfo');

    const searchInputComponent = fixture.debugElement.query(By.directive(SearchInputComponent));
    searchInputComponent.triggerEventHandler('onNameTyped', 'repository');

    fixture.whenStable().then(() => {
      expect(component.getBasicInfo).toHaveBeenCalled();
    });

  }));
});
