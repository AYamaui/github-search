import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsComponent } from './statistics.component';
import { SearchInputComponent } from '../search-input/search-input.component';
import { HomeComponent } from '../home/home.component';
import { IssuesComponent } from '../issues/issues.component';
import { BasicInfoComponent } from '../basic-info/basic-info.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgHttpLoaderModule } from 'ng-http-loader';
import {Issue} from '../../models/issue/issue';

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;

  const issues = [
    new Issue(
      'url1',
      1,
      'title1',
      'userUrl1',
      'state',
      new Date('2019-04-19T09:44:15+00:00'),
      new Date('2019-04-19T09:44:15+00:00'),
      'userLogin1',
      'description1',
      'userAvatarUrl1'
    ),
    new Issue(
      'url2',
      2,
      'title2',
      'userUrl2',
      'state',
      new Date('2019-05-20T09:44:15+00:00'),
      new Date('2019-05-20T09:44:15+00:00'),
      'userLogin2',
      'description2',
      'userAvatarUrl2'
    ),
    new Issue(
      'url13',
      3,
      'title3',
      'userUrl3',
      'state',
      new Date('2019-04-25T09:44:15+00:00'),
      new Date('2019-04-25T09:44:15+00:00'),
      'userLogin3',
      'description3',
      'userAvatarUrl3'
    )
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchInputComponent, HomeComponent, IssuesComponent, BasicInfoComponent, StatisticsComponent ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NgxPaginationModule,
        NgHttpLoaderModule.forRoot()
      ],
      providers: [ HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.issues = issues;
  });

  it('should create', () => {
    component.issues = issues;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // it('should aggregate issues by date', () => {
  //
  //   expect(component.aggregateIssuesByDate('createdAt')).toEqual(
  //     {
  //       '04/01/2019': 2,
  //       '05/01/2019': 1
  //     }
  //   );
  // });
});
