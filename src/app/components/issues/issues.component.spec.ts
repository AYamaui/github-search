import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesComponent } from './issues.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchService } from '../../services/search/search.service';
import { HttpClientModule } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { BasicInfo } from '../../models/basic-info/basic-info';
import { Issue } from '../../models/issue/issue';
import { BrowserModule, By } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { HomeComponent } from '../home/home.component';
import { SearchInputComponent } from '../search-input/search-input.component';
import { BasicInfoComponent } from '../basic-info/basic-info.component';
import { ActivatedRoute } from '@angular/router';

describe('IssuesComponent', () => {
  let component: IssuesComponent;
  let fixture: ComponentFixture<IssuesComponent>;

  beforeEach(async(() => {

    // A SearchService Stub
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
          'createdAt',
          'updatedAt',
          'userLogin',
          'description',
          'userAvatarUrl',
        )], '1']
      )
    };

    TestBed.configureTestingModule({
      declarations: [ IssuesComponent, HomeComponent, SearchInputComponent, BasicInfoComponent ],
      providers: [
        { provide: SearchService, useValue: searchServiceStub },
        { provide: ActivatedRoute, useValue: { params: of({ author: 'author', repositoryName: 'repositoryName' })}},
        HttpClientModule
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
    fixture = TestBed.createComponent(IssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Tests if the issues are displayed correctly
  it('should display issues', () => {
    component.issues = [
      new Issue(
        'url',
        1,
        'title',
        'userUrl',
        'open',
        '2019-04-19T09:44:15+00:00',
        '2019-04-19T09:44:15+00:00',
        'userLogin',
        'description',
        'userAvatarUrl'
      )
    ];

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.issue-title')).nativeElement.innerText).toEqual('title');
    expect(fixture.debugElement.query(By.css('.issue-title')).nativeElement.getAttribute('href')).toEqual('url');
    expect(fixture.debugElement.query(By.css('img')).nativeElement.getAttribute('src')).toEqual('userAvatarUrl');
    expect(fixture.debugElement.query(By.css('#user-login-name')).nativeElement.innerText).toEqual('userLogin');
    expect(fixture.debugElement.query(By.css('.badge')).nativeElement.innerText).toEqual('Open');
    expect(fixture.debugElement.query(By.css('#updated-at')).nativeElement.innerText).toEqual('Last updated: Apr 19, 2019');
  });

  // Tests if the pagination widget is hidden when there no issues
  it('should not display pagination if no issues are found', () => {
    component.issues = [];
    component.totalIssues = 0;

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('pagination-controls'))).toBeNull();
  });

  // Test if the button of 'Load more issues' is shown correctly when the condition is met
  it('should display the Load More Issues button', () => {

    component.issues = [
      new Issue(
        'url',
        1,
        'title',
        'userUrl',
        'open',
        '2019-04-19T09:44:15+00:00',
        '2019-04-19T09:44:15+00:00',
        'userLogin',
        'description',
        'userAvatarUrl'
      )
    ];
    component.totalIssues = 2;
    component.page = 1;
    component.issuesPerPage = 1;

    fixture.detectChanges();

    spyOn(component, 'getIssues');
    fixture.debugElement.query(By.css('#load-more-issues')).triggerEventHandler('click', null);
    expect(component.getIssues).toHaveBeenCalled();
  });

  // Tests if after the component starts the repositoryFullName property is set correctly, the function getIssues is called
  // and that the content of the issues array is correct
  it('should receive issues from SearchService on init', () => {
    spyOn(component, 'getIssues');
    component.ngOnInit();

    expect(component.repositoryFullName).toEqual('author/repositoryName');

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
  });

  // Tests if another page of issues is retrieved successfully from the SearchService, when the 'Load more issues' button
  // is cliked and that the content of the issues array is correct
  it('should receive more issues from SearchService', () => {
    spyOn(component, 'getIssues').and.callThrough();

    component.issues = [
      new Issue(
        'url',
        1,
        'title',
        'userUrl',
        'open',
        '2019-04-19T09:44:15+00:00',
        '2019-04-19T09:44:15+00:00',
        'userLogin',
        'description',
        'userAvatarUrl'
      )
    ];
    component.totalIssues = 2;
    component.page = 1;
    component.issuesPerPage = 1;

    fixture.detectChanges();

    fixture.debugElement.query(By.css('#load-more-issues')).triggerEventHandler('click', {});

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
  });
});
