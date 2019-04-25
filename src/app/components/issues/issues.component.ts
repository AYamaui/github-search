import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchService } from '../../services/search/search.service';
import { Issue } from '../../models/issue/issue';

// Component that fetches and displays the issues associated to the repository
@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
  providers: [SearchService]
})

export class IssuesComponent implements OnInit {

  private githubPage: number; // The page of results to retrieve from the Github API
  public issues: Issue[]; // Issues array
  public page: number; // Current page of the component pagination widget
  public issuesPerPage: number; // Amount of issues that are displayed per page
  public totalIssues: number; // Total number of issues existing in the repository

  @Input() public repositoryFullName: string; // Full name of repository (owner/repository)
  @Output() public onAPIError = new EventEmitter<boolean>(); // Event that is triggered when there is an error fetching the issues
  @Output() public onIssuesPopulated = new EventEmitter<any>(); // Event that is triggered when the issues array is populated

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.issues = [];
    this.page = 1;
    this.issuesPerPage = 10;
    this.githubPage = 0;

    this.getIssues();

  }

  /*
    Indicates if the 'Load more issues' button should be displayed.
    return: boolean
      Boolean that becomes true if we are at the last page of the pagination and there still are issues to fetch from Github
   */
  showMoreResults() {

    if (this.issues) {
      return (this.issues.length === (this.page * this.issuesPerPage) && (this.page * this.issuesPerPage) < this.totalIssues);
    }
  }

  /*
    Fetches the repository issues from the SearchService and concatenates the result to the existing issues array.
    Every time a batch of issues is retrieved the property githubPage increases in 1.
  */
  getIssues() {
    this.searchService.getIssues(this.repositoryFullName, this.githubPage).subscribe(
      ([issues, totalIssues]) => {
        this.githubPage += 1;
        this.issues = this.issues.concat(issues);
        this.totalIssues = totalIssues;

        this.sendIssuesPopulated();
      },
      (error) => {
        this.sendAPIError();
      },
    );
  }

  // Sends an event to show an alert indicating that an error with the Github API occurred
  sendAPIError() {
    this.onAPIError.emit(true);
  }

  // Sends an event to announce that the issues array was populated
  sendIssuesPopulated() {
    this.onIssuesPopulated.emit([this.issues, this.totalIssues]);
  }

}
