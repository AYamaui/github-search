import { Component, ComponentRef, Input, OnInit } from '@angular/core';
import { BasicInfo } from '../../models/basic-info/basic-info';
import { IssuesComponent } from '../issues/issues.component';
import { Issue } from '../../models/issue/issue';
import { StatisticsComponent } from '../statistics/statistics.component';
import { SearchService } from '../../services/search/search.service';

// Main component that contains the interactions between the rest of the components
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  private issuesComponentRef: ComponentRef<IssuesComponent>; // Reference to IssuesComponent
  private statisticsComponentRef: ComponentRef<StatisticsComponent>; // Reference to StatisticsComponent
  public repositoryName: string;
  public basicInfo: BasicInfo; // BasicInfo object that contains the repository basic information
  public initIssuesComponent: boolean; // Indicates if the issues component should be started
  public showAlert: boolean; // Indicates if the alert widget should be displayed due to an error with the API call
  public repositoryFullName: string; // Full name of repository (owner/repository)
  public currentTab: string; // String that indicates which is the active tab

  @Input() public issues: Issue[]; // Issues array

  constructor(private searchService: SearchService) {

    // Subscribes to an observer to get the repository name
    this.searchService.onNameTyped.subscribe( (repositoryName) => {
      this.repositoryName = repositoryName;
    });
  }

  ngOnInit() {
    this.init();
  }

  // Initializes the properties
  private init() {
    this.showAlert = false;
    this.initIssuesComponent = false;
    this.currentTab = 'basic-info';
  }

  // Resets the variables and destroys the issues and statistics components instances
  public reset() {
    this.init();

    if (this.issuesComponentRef) {
      this.issuesComponentRef.destroy();
    }

    if (this.statisticsComponentRef) {
      this.statisticsComponentRef.destroy();
    }
  }

  /*
    Sets the basicInfo and repositoryFullName properties
    param basicInfo: BasicInfo
      The BasicInfo object that contains the basic information of the repository
   */
  setBasicInfo(basicInfo) {
    this.basicInfo = basicInfo;
    this.repositoryFullName = this.basicInfo.fullName;
    this.getIssues();
  }

  /*
    Initializes the issues array and the totalIssues properties
    param eventContent: Array<any>
      An array that contains the issues array and the total number of issues coming from the IssuesComponent on the onIssuesPopulated event
   */
  initIssues(eventContent) {
    this.issues = eventContent[0];
  }

  // Makes true the flag that allows to initialize the IssuesComponent
  getIssues() {
    this.initIssuesComponent = true;
  }

  /*
    Indicates if the charts should be displayed
    return: boolean
      Boolean that becomes true if the IssuesComponent is initialized, the issues array is defined and there is at least one issue
   */
  showStatistics() {
    return (this.initIssuesComponent && this.issues && this.issues.length > 0);
  }

  /*
    Changes the tab depending of the option selected
    param tab: string
      Name of the selected tab
   */
  changeTab(tab) {
    this.currentTab = tab;
  }
}
