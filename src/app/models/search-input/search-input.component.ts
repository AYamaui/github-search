import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  public repositoryName: string;
  basicInfo: object;

  @Output() onNameTyped = new EventEmitter<string>();

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  getBasicInfo() {
    this.searchService.getBasicInfo(this.repositoryName).subscribe( (res) => {
      const firstItem = res['items'][0];

      this.basicInfo = {
        fullName: firstItem['full_name'],
        url: firstItem['html_url'],
        description: firstItem['description'],
        forksUrl: firstItem['forks_url'],
        forks: firstItem['forks_count'],
        issuesUrl: firstItem['issue_events_url'],
        openIssues: firstItem['open_issues_count'],
        stargazersUrl: firstItem['stargazers_url'],
        stargazers: firstItem['stargazers_count'],
        commitsUrl: firstItem['commits_url']
      };
    });
  }
}
