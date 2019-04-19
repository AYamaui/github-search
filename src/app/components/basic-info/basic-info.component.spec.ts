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

describe('BasicInfoComponent', () => {
  let component: BasicInfoComponent;
  let fixture: ComponentFixture<BasicInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicInfoComponent, HomeComponent, IssuesComponent, SearchInputComponent ],
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

    component.basicInfo = new BasicInfo(
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

    fixture.detectChanges();
  });

  // Tests if the component is created successfully
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Tests if the basic info is displayed correctly
  it('should display basic info', () => {

    expect(fixture.debugElement.query(By.css('h3')).nativeElement.innerText).toEqual('fullName');
    expect(fixture.debugElement.query(By.css('#url a')).nativeElement.innerText).toEqual('url');
    expect(fixture.nativeElement.querySelector('#description').innerText).toEqual('description');
    expect(fixture.nativeElement.querySelector('#forks').innerText).toEqual('1');
    expect(fixture.nativeElement.querySelector('#stargazers').innerText).toEqual( '1');
    expect(fixture.nativeElement.querySelector('#open-issues').innerText).toEqual('1');

  });

  // Tests if a meesage is displayed when no repositories are found
  it('should display a message when no repositories are found', () => {
    component.basicInfo.repositories = 0;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('#no-repositories')).nativeElement.innerText).
      toEqual('We could not find any repository with that name');
  });

});
