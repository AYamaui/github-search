import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInfoComponent } from './basic-info.component';
import { BasicInfo } from '../../models/basic-info/basic-info';
import {By} from '@angular/platform-browser';

describe('BasicInfoComponent', () => {
  let component: BasicInfoComponent;
  let fixture: ComponentFixture<BasicInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicInfoComponent ]
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
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display basic info', () => {

    expect(fixture.debugElement.query(By.css('h3')).nativeElement.innerText).toEqual('fullName');
    expect(fixture.debugElement.query(By.css('#url a')).nativeElement.innerText).toEqual('url');
    expect(fixture.nativeElement.querySelector('#description').innerText).toEqual('description');
    expect(fixture.nativeElement.querySelector('#forks').innerText).toEqual('1');
    expect(fixture.nativeElement.querySelector('#stargazers').innerText).toEqual( '1');
    expect(fixture.nativeElement.querySelector('#open-issues').innerText).toEqual('1');
  });

  it('should call the function getIssues on click', () => {

    spyOn(component.onIssuesClicked, 'emit');
    fixture.debugElement.query(By.css('#get-issues-link')).triggerEventHandler('click', null);
    expect(component.onIssuesClicked.emit).toHaveBeenCalled();
  });

  it('should display a message when no repositories are found', () => {
    component.basicInfo.repositories = 0;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('#no-repositories')).nativeElement.innerText).
      toEqual('We could not find any repository with that name');
  });

});
