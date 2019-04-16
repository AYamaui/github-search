import { Component, EventEmitter, OnInit, Output  } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { IssuesComponent } from '../issues/issues.component';
import { Issue } from '../../models/issue/issue';
import { search } from '../../../../node_modules/octicons';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  providers: [IssuesComponent]
})
export class SearchInputComponent implements OnInit {

  public repositoryName: string;
  public repositoryFullName: string;
  public repositoryId: string;
  public basicInfo: object;
  public issues: Issue[];
  public page: number;
  public issuesPerPage: number;
  public searchIcon: SafeHtml;

  @Output() onNameTyped = new EventEmitter<string>();

  constructor(private searchService: SearchService, private issuesComponent: IssuesComponent, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.issues = [];
    this.page = 1;
    this.issuesPerPage = 10;
    this.searchIcon = this.sanitizer.bypassSecurityTrustHtml(search.toSVG());
  }

  getBasicInfo() {
    this.showLoader();

    this.searchService.getBasicInfo(this.repositoryName).subscribe( (res) => {
      const firstItem = res['items'][0];

      this.repositoryId = firstItem.id;
      this.repositoryFullName = firstItem.full_name;

      this.basicInfo = {
        id: firstItem.id,
        fullName: firstItem.full_name,
        url: firstItem.html_url,
        description: firstItem.description,
        forksUrl: firstItem.forks_url,
        forks: firstItem.forks_count,
        issuesUrl: firstItem.issue_events_url,
        openIssues: firstItem.open_issues_count,
        stargazersUrl: firstItem.stargazers_url,
        stargazers: firstItem.stargazers_count,
        commitsUrl: firstItem.commits_url
      };
    });
  }

  getIssues() {
    // this.showLoader();
    console.log(this.repositoryFullName);
    console.log('PROBA');
    console.log(this);
    console.log(this.issues);

    this.searchService.getIssues(this.repositoryFullName).subscribe((issues) => {
      console.log(this.issues);
      this.issues = issues;
      // this.issues.push(new Issue('hola', '2', 'alex', 'vivo', '123'));
      console.log(this.issues);
      console.log(this.issues[0].url);
    });
  }

  goToIssuesPage() {
    this.issuesComponent.getIssues(this.repositoryFullName, this.repositoryId);
  }


  showLoader() {

  }

  hideLoader() {

  }
}
