import { Component, OnInit } from '@angular/core';
import { BasicInfo } from '../../models/basic-info/basic-info';
import { Issue } from '../../models/issue/issue';
import { SearchService } from '../../services/search/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public repositoryName: string;
  public repositoryFullName: string;
  public repositoryId: string;
  public basicInfo: BasicInfo;
  public issues: Issue[];
  public totalIssues: number;
  public githubPage: number;

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
    this.issues = [];
    this.githubPage = 0;
  }

  getBasicInfo() {

    this.searchService.getBasicInfo(this.repositoryName).subscribe( (basicInfo) => {
      this.basicInfo = basicInfo;
      this.repositoryId = basicInfo.id;
      this.repositoryFullName = basicInfo.fullName;
    });
  }

  getIssues() {

    console.log('getting issues');
    this.searchService.getIssues(this.repositoryFullName, this.githubPage).subscribe(([issues, totalIssues]) => {
      this.githubPage += 1;
      this.issues = this.issues.concat(issues);
      this.totalIssues = totalIssues;
    });
  }

}
