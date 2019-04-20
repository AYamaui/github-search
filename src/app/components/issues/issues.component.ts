import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchService } from '../../services/search/search.service';
import { ActivatedRoute } from '@angular/router';
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
  public  issues: Issue[]; // Issues array
  public page: number; // Current page of the component pagination widget
  public issuesPerPage: number; // Amount of issues that are displayed per page
  public totalIssues: number; // Total number of issues existing in the repository
  @Input() public repositoryFullName: string; // Full name of repository (owner/repository), populated by HomeComponent
  @Output() public onAPIError = new EventEmitter<boolean>(); // Indicates if there was an error with the Github API

  constructor(private searchService: SearchService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.issues = [];
    this.page = 1;
    this.issuesPerPage = 10;
    this.githubPage = 0;

    // Initializes the issues array
    this.getIssues();
  }

  // Returns a boolean indicating if the 'Load more issues' button should be displayed.
  showMoreResults() {

    if (this.issues) {
      return (this.issues.length === (this.page * this.issuesPerPage) && (this.page * this.issuesPerPage) < this.totalIssues);
    }
  }

  // Fetches the repository issues from the SearchService and concatenates the result to the existing issues array.
  // Every time a batch of issues are retrieved the property githubPage increases in 1.
  getIssues() {

    this.searchService.getIssues(this.repositoryFullName, this.githubPage).subscribe(
      ([issues, totalIssues]) => {
        this.githubPage += 1;
        this.issues = this.issues.concat(issues);
        this.totalIssues = totalIssues;
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

}
