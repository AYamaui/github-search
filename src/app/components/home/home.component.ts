import { Component, ComponentRef, OnInit } from '@angular/core';
import { BasicInfo } from '../../models/basic-info/basic-info';
import { SearchService } from '../../services/search/search.service';
import { IssuesComponent } from '../issues/issues.component';

// Main component that contains the SearchInputComponent and the BasicInfoComponent
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public repositoryName: string;
  public repositoryFullName: string; // Repository full name (owner/repository)
  public basicInfo: BasicInfo; // BasicInfo object that contains the repository basic information
  public showIssues: boolean; // Indicates if the issues list should be displayed
  public showAlert: boolean; // Indicates if the alert widget should be displayed due to an error with the API call
  private issuesComponentRef: ComponentRef<IssuesComponent>; // Reference to IssuesComponent

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
    localStorage.removeItem('basicInfo');
    sessionStorage.removeItem('basicInfo');
    this.showIssues = false;
    this.showAlert = false;
  }

  // Resets the variables and destroys the issues component instance
  private reset() {
    this.showAlert = false;
    this.showIssues = false;

    if (this.issuesComponentRef) {
      this.issuesComponentRef.destroy();
    }
  }

  // Retrieves the basic information from the SearchService and saves it into the basicInfo property
  getBasicInfo() {
    this.reset();

    this.searchService.getBasicInfo(this.repositoryName).subscribe( (basicInfo) => {
      this.basicInfo = basicInfo;
      this.repositoryFullName = basicInfo.fullName;
    });

  }
}
