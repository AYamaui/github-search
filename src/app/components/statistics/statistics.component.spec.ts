import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsComponent } from './statistics.component';
import { SearchInputComponent } from '../search-input/search-input.component';
import { HomeComponent } from '../home/home.component';
import { IssuesComponent } from '../issues/issues.component';
import { BasicInfoComponent } from '../basic-info/basic-info.component';
import {BrowserModule, By} from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgHttpLoaderModule } from 'ng-http-loader';
import {Issue} from '../../models/issue/issue';
import {BasicInfo} from '../../models/basic-info/basic-info';
import {findComponentView} from '@angular/core/src/render3/util';

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

  const basicInfo = new BasicInfo(
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
  );

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

    component.issues = issues;
    component.basicInfo = basicInfo;
    fixture.detectChanges();
  });

  // Tests if the component is created successfully
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should aggregate issues by date', () => {

    expect(component.aggregateIssuesByDate('createdAt')).toEqual(
      {
        '4/01/2019': 2,
        '5/01/2019': 1
      }
    );
  });

  // Tests if the aggregated issues are sorted by date and only the 18th last months are displayed
  it('should sort by date and get the 18 most recent months', () => {
    const aggregatedIssues = {
        '5/01/2018': 1,
        '6/01/2018': 1,
        '2/01/2017': 1,
        '3/01/2017': 1,
        '7/01/2018': 1,
        '8/01/2018': 1,
        '9/01/2018': 1,
        '10/01/2018': 1,
        '11/01/2018': 1,
        '12/01/2018': 1,
        '1/01/2017': 1,
        '4/01/2017': 1,
        '4/01/2019': 2,
        '5/01/2019': 1,
        '1/01/2018': 1,
        '2/01/2018': 1,
        '3/01/2018': 1,
        '4/01/2018': 1,
        '5/01/2017': 1,
        '6/01/2017': 1
      }
    ;

    const sortedIssues: { date: Date, nIssues: number }[] = [
      { date: new Date('3/01/2017'), nIssues: 1 },
      { date: new Date('4/01/2017'), nIssues: 1 },
      { date: new Date('5/01/2017'), nIssues: 1 },
      { date: new Date('6/01/2017'), nIssues: 1 },
      { date: new Date('1/01/2018'), nIssues: 1 },
      { date: new Date('2/01/2018'), nIssues: 1 },
      { date: new Date('3/01/2018'), nIssues: 1 },
      { date: new Date('4/01/2018'), nIssues: 1 },
      { date: new Date('5/01/2018'), nIssues: 1 },
      { date: new Date('6/01/2018'), nIssues: 1 },
      { date: new Date('7/01/2018'), nIssues: 1 },
      { date: new Date('8/01/2018'), nIssues: 1 },
      { date: new Date('9/01/2018'), nIssues: 1 },
      { date: new Date('10/01/2018'), nIssues: 1 },
      { date: new Date('11/01/2018'), nIssues: 1 },
      { date: new Date('12/01/2018'), nIssues: 1 },
      { date: new Date('4/01/2019'), nIssues: 2 },
      { date: new Date('5/01/2019'), nIssues: 1 }
    ];

    expect(component.sortAndSlice(aggregatedIssues)).toEqual(sortedIssues);
  });

  // Tests if the date is formatted as 'Month Year' string
  it('should give the dates the format "Month year"', () => {
    const sortedIssues: { date: Date, nIssues: number }[] = [
      { date: new Date('5/01/2019'), nIssues: 1 },
      { date: new Date('4/01/2019'), nIssues: 2 },
      { date: new Date('12/01/2018'), nIssues: 1 },
      { date: new Date('11/01/2018'), nIssues: 1 },
      { date: new Date('10/01/2018'), nIssues: 1 },
      { date: new Date('9/01/2018'), nIssues: 1 },
      { date: new Date('8/01/2018'), nIssues: 1 },
      { date: new Date('7/01/2018'), nIssues: 1 },
      { date: new Date('6/01/2018'), nIssues: 1 },
      { date: new Date('5/01/2018'), nIssues: 1 },
      { date: new Date('4/01/2018'), nIssues: 1 },
      { date: new Date('3/01/2018'), nIssues: 1 },
      { date: new Date('2/01/2018'), nIssues: 1 },
      { date: new Date('1/01/2018'), nIssues: 1 },
      { date: new Date('6/01/2017'), nIssues: 1 },
      { date: new Date('5/01/2017'), nIssues: 1 },
      { date: new Date('4/01/2017'), nIssues: 1 },
      { date: new Date('3/01/2017'), nIssues: 1 }
    ];

    const formattedIssues: { date: string, nIssues: number }[] = [
      { date: 'May 2019', nIssues: 1 },
      { date: 'Apr 2019', nIssues: 2 },
      { date: 'Dec 2018', nIssues: 1 },
      { date: 'Nov 2018', nIssues: 1 },
      { date: 'Oct 2018', nIssues: 1 },
      { date: 'Sep 2018', nIssues: 1 },
      { date: 'Aug 2018', nIssues: 1 },
      { date: 'Jul 2018', nIssues: 1 },
      { date: 'Jun 2018', nIssues: 1 },
      { date: 'May 2018', nIssues: 1 },
      { date: 'Apr 2018', nIssues: 1 },
      { date: 'Mar 2018', nIssues: 1 },
      { date: 'Feb 2018', nIssues: 1 },
      { date: 'Jan 2018', nIssues: 1 },
      { date: 'Jun 2017', nIssues: 1 },
      { date: 'May 2017', nIssues: 1 },
      { date: 'Apr 2017', nIssues: 1 },
      { date: 'Mar 2017', nIssues: 1 }
    ];

    component.formatDate(sortedIssues);
    expect(sortedIssues).toEqual((formattedIssues as any));

  });

  // Tests if the bar chart is initialized
  it('should display the bar chart', () => {
    component.drawBarChart('issues-by-creation-date', issues, 'title', 'fill');

    expect(fixture.debugElement.query(By.css('#issues-by-creation-date')).nativeElement
      .getAttribute('svg')).toBeDefined();

    expect(fixture.debugElement.query(By.css('#issues-by-creation-date')).nativeElement
      .getAttribute('svg g')).toBeDefined();
  });

  // Tests if the pie chart is initialized
  it('should display the pie chart', () => {
    component.drawPieChart('#open-vs-closed-issues', [10, 20], 'title');

    expect(fixture.debugElement.query(By.css('#open-vs-closed-issues')).nativeElement
      .getAttribute('svg')).toBeDefined();

    expect(fixture.debugElement.query(By.css('#open-vs-closed-issues')).nativeElement
      .getAttribute('svg g')).toBeDefined();
  });
});
