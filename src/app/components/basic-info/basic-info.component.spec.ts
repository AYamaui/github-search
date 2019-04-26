import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInfoComponent } from './basic-info.component';
import { BasicInfo } from '../../models/basic-info/basic-info';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from '../../app-routing.module';
import { HomeComponent } from '../home/home.component';
import { SearchInputComponent } from '../search-input/search-input.component';
import { IssuesComponent } from '../issues/issues.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { StatisticsComponent } from '../statistics/statistics.component';
import { SearchService } from '../../services/search/search.service';
import { of } from 'rxjs';

describe('BasicInfoComponent', () => {
  let component: BasicInfoComponent;
  let fixture: ComponentFixture<BasicInfoComponent>;
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
          'name',
          'ownerAvatarUrl'
        )
      ),
      onNameTyped: {
        subscribe: () => {}
      },
      updateRepositoryName: () => of('repositoryName')
    };

    TestBed.configureTestingModule({
      declarations: [ BasicInfoComponent, HomeComponent, IssuesComponent, SearchInputComponent, StatisticsComponent ],
      providers: [ { provide: SearchService, useValue: searchServiceStub }],
      imports: [
        RouterTestingModule,
        AppRoutingModule,
        NgxPaginationModule,
        FormsModule
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicInfoComponent);
    component = fixture.componentInstance;
    searchService = TestBed.get(SearchService);

    fixture.detectChanges();
  });


  // Tests if the component is created correctly
  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  /*
    Tests if the repositoryName property is populated after an update to the nameTyped subject and
    the getBasicInfo and sendBasicInfo functions are called
   */
  it('should populate repositoryName property, call getBasicInco() and sendBasicInfo()', async(() => {

    spyOn(searchService, 'updateRepositoryName' );

    searchService.onNameTyped.subscribe(  (repositoryName) => {
      expect(component.repositoryName).toBeDefined();
      expect(component.repositoryName).toEqual(repositoryName);
      expect(component.getBasicInfo).toHaveBeenCalled();
      expect(component.sendBasicInfo).toHaveBeenCalled();
    });
  }));

  // Tests if the basic info is displayed correctly
  it('should display basic info', () => {
    spyOn(searchService, 'updateRepositoryName' );

    searchService.onNameTyped.subscribe(  (repositoryName) => {

      expect(fixture.debugElement.query(By.css('img.user-avatar')).nativeElement.getAttribute('src'))
        .toEqual('ownerAvatarUrl');
      expect(fixture.debugElement.query(By.css('h3')).nativeElement.innerText).toEqual('fullName');
      expect(fixture.debugElement.query(By.css('#url a')).nativeElement.innerText).toEqual('url');
      expect(fixture.nativeElement.querySelector('#description').innerText).toEqual('description');
      expect(fixture.nativeElement.querySelector('#forks').innerText).toEqual('1');
      expect(fixture.nativeElement.querySelector('#stargazers').innerText).toEqual('1');
      expect(fixture.nativeElement.querySelector('#open-issues').innerText).toEqual('1');
    });

  });

  // Tests if a message is displayed when no repositories are found
  it('should display a message when no repositories are found', () => {
    spyOn(searchService, 'updateRepositoryName' );

    searchService.onNameTyped.subscribe(  (repositoryName) => {
      component.basicInfo.repositories = 0;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('#no-repositories')).nativeElement.innerText)
        .toEqual('We could not find any repository with that name');
    });
  });

  // Tests if teh repositoryName is updated when there is an update through the updateRepositoryName function
  it('should update the repositoryName property after calling the updateRepositoryName() function', () => {
    searchService.updateRepositoryName('newRepositoryName');

    searchService.onNameTyped.subscribe(  (repositoryName) => {

      expect(repositoryName).toEqual('newRepositoryName');
      expect(component.repositoryName).toEqual('newRepositoryName');
    });
  });

});
