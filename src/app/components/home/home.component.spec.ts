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
import { StatisticsComponent } from '../statistics/statistics.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let searchService: SearchService;

  beforeEach(async(() => {

    // SearchService stub
    const searchServiceStub = {
      onNameTyped: {
        subscribe: () => {}
      },
      updateRepositoryName: () => of('repositoryName')
    };

    TestBed.configureTestingModule({
      declarations: [ HomeComponent, BasicInfoComponent, SearchInputComponent, IssuesComponent, StatisticsComponent ],
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

  // Tests if the repositoryName property is populated after an update to the nameTyped subject
  it('should populate repositoryName property', async(() => {

    spyOn(searchService, 'updateRepositoryName' );

    searchService.onNameTyped.subscribe(  (repositoryName) => {
      expect(component.repositoryName).toBeDefined();
      expect(component.repositoryName).toEqual(repositoryName);
    });
  }));

  /*
    Tests if the basicInfo property is properly populated after the onBasicInfoRetrieved event is triggered and
    that the flag to init IssuesComponent is set tu true
   */
  it('should populate basicInfo property and sets to true the flag to init IssuesComponent', () => {
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
    const basicInfoComponent = fixture.debugElement.query(By.directive(BasicInfoComponent));
    basicInfoComponent.triggerEventHandler('onBasicInfoRetrieved', basicInfo);

    fixture.whenStable().then(() => {
      expect(component.setBasicInfo).toHaveBeenCalled();
      expect(component.basicInfo).toEqual(basicInfo);
      expect(component.getIssues).toHaveBeenCalled();
      expect(component.initIssuesComponent).toBeTruthy();
    });
  });

  // Tests if the changeTab() function adds the class 'active' to the right HTML tab
  it('should add class active to the specified tab', () => {
    spyOn(component, 'changeTab').and.callThrough();
    component.ngOnInit();
    component.initIssuesComponent = true;
    component.changeTab('statistics');
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('#statistics')).nativeElement
      .getAttribute('class')).toContain('active');
    expect(fixture.debugElement.query(By.css('#issues')).nativeElement
      .getAttribute('class')).not.toContain('active');
    expect(fixture.debugElement.query(By.css('#basic-info')).nativeElement
      .getAttribute('class')).not.toContain('active');
  });

  // Tests if the issues property is properly populated with the content of the onIssuesPopulated event
  it('should populate the issues property with the content of the onIssuesPopulated event', () => {
    const issues = [
      new Issue(
        'url',
        1,
        'title',
        'userUrl',
        'state',
        new Date('2019-04-19T09:44:15+00:00'),
        new Date('2019-04-19T09:44:15+00:00'),
        'userLogin',
        'description',
        'userAvatarUrl'
      )
    ];

    const issuesComponent = fixture.debugElement.query(By.directive(IssuesComponent));
    issuesComponent.triggerEventHandler('onIssuesPopulated', issues);

    fixture.whenStable().then(() => {
      expect(component.initIssues).toHaveBeenCalled();
      expect(component.issues).toEqual(issues);
    });
  });

  // Tests if the StatisticsComponent is initialized when the conditions are met
  it('should set to true the flag to init the StatisticsComponent', () => {
    const issues = [
      new Issue(
        'url',
        1,
        'title',
        'userUrl',
        'state',
        new Date('2019-04-19T09:44:15+00:00'),
        new Date('2019-04-19T09:44:15+00:00'),
        'userLogin',
        'description',
        'userAvatarUrl'
      )
    ];

    const issuesComponent = fixture.debugElement.query(By.directive(IssuesComponent));
    issuesComponent.triggerEventHandler('onIssuesPopulated', issues);
    component.initIssuesComponent = true;

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.showStatistics()).toBeTruthy();
    });
  });

  // Tests if the reset() function is called when receiving the event of onNameTyped and the Issues and Statistics components are removed
  it('should call the reset() function on noNameTyped event and remove the Issues and Statistics components', () => {
    const basicInfoComponent = fixture.debugElement.query(By.directive(BasicInfoComponent));
    basicInfoComponent.triggerEventHandler('onNameTyped', {});

    fixture.whenStable().then(() => {
      expect(component.reset).toHaveBeenCalled();
      expect(fixture.debugElement.query(By.directive(IssuesComponent))).not.toBeDefined();
      expect(fixture.debugElement.query(By.directive(StatisticsComponent))).not.toBeDefined();
    });
  });
});
