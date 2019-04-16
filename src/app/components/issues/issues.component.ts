import { Component, OnInit } from '@angular/core';
import { SearchService} from '../../services/search.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Issue } from '../../models/issue/issue';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
  providers: [SearchService]
})
export class IssuesComponent implements OnInit {

  public issues: Issue[];

  constructor(private searchService: SearchService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.issues = [];
  }

  getIssues(repositoryFullName: string, repositoryId: string) {
    // this.showLoader();

    this.searchService.getIssues(repositoryFullName).subscribe((issues) => {
      this.issues = issues;
      console.log(this.issues);
      console.log(this.issues[0].url);
      this.goToIssuesPage(repositoryId);
    });
  }

  showLoader() {

  }

  hideLoader() {

  }

  goToIssuesPage(repositoryId) {
    this.router.navigate([`repositories/${repositoryId}/issues`]);
  }

}
