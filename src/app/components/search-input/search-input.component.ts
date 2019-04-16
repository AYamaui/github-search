import { Component, EventEmitter, OnInit, Output  } from '@angular/core';
import { SearchService } from '../../services/search/search.service';
import { IssuesComponent } from '../issues/issues.component';
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
  public searchIcon: SafeHtml;

  @Output() public onNameTyped = new EventEmitter<string>();

  constructor(private searchService: SearchService, private issuesComponent: IssuesComponent, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.searchIcon = this.sanitizer.bypassSecurityTrustHtml(search.toSVG());
  }

  sendRepositoryName() {
    this.onNameTyped.emit(this.repositoryName);
  }
}
