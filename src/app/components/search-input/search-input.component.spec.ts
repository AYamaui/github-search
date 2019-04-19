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

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchInputComponent, HomeComponent, IssuesComponent, BasicInfoComponent ],
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
    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    fixture.detectChanges();
  });

  // Tests if the component is created correctly
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Tests if an event is sent with the repository name when the repository name is typed
  it('should call the function sendRepositoryName on click', () => {
    spyOn(component.onNameTyped, 'emit');
    de.query(By.css('a')).triggerEventHandler('click', null);
    expect(component.onNameTyped.emit).toHaveBeenCalled();
  });

});
