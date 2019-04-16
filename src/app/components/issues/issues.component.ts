import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { SearchService } from '../../services/search/search.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Issue } from '../../models/issue/issue';
import { stringify } from 'querystring';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
  providers: [SearchService]
})

export class IssuesComponent implements OnInit {

  @Input() public issues: Issue[];
  @Input() totalIssues: number;
  @Output() public onLoadMoreIssues = new EventEmitter<string>();
  public page: number;
  public issuesPerPage: number;

  constructor(private searchService: SearchService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.page = 1;
    this.issuesPerPage = 10;
  }

  showMoreResults() {
    return (this.issues.length === (this.page * this.issuesPerPage) && (this.page * this.issuesPerPage) < this.totalIssues);
  }

  loadMoreIssues() {
    this.onLoadMoreIssues.emit(stringify(this.page));
  }

  goToIssuesPage(repositoryId) {
    this.router.navigate([`repositories/${repositoryId}/issues`]);
  }

}
