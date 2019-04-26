import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputComponent } from './search-input.component';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule, By } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { HomeComponent } from '../home/home.component';
import { IssuesComponent } from '../issues/issues.component';
import { BasicInfoComponent } from '../basic-info/basic-info.component';
import { StatisticsComponent } from '../statistics/statistics.component';
import { SearchService } from '../../services/search/search.service';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;
  let de: DebugElement;
  let searchService: SearchService;

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
      providers: [ HttpClientModule, SearchService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    searchService = TestBed.get(SearchService);

    fixture.detectChanges();
  });

  // Tests if the component is created correctly
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*
    Tests if an event is sent when the repository name is typed.
    Additionally, the shared repositoryName variable is updated
   */
  it('should send an event when the repositoryName is introduced and update the BehaviourSubject ' +
    'calling the updateRepositoryName function', () => {
    spyOn(component.onNameTyped, 'emit');
    spyOn(searchService, 'updateRepositoryName').and.callThrough();
    de.query(By.css('a')).triggerEventHandler('click', null);
    expect(component.onNameTyped.emit).toHaveBeenCalled();
    expect(searchService.updateRepositoryName).toHaveBeenCalled();
  });

});
