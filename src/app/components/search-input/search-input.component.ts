import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchService } from '../../services/search/search.service';
import { IssuesComponent } from '../issues/issues.component';
import { search } from '../../../../node_modules/octicons';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// Component that receives the repository name by text input and sends it to other components
@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  providers: [IssuesComponent]
})
export class SearchInputComponent implements OnInit {

  public repositoryName: string;
  public searchIcon: SafeHtml;

  @Output() public onNameTyped = new EventEmitter<string>(); // Event triggered when the search icon is clicked
  @Output() public onEnterPressed = new EventEmitter<string>(); // Event triggered when the Enter key is pressed

  constructor(private searchService: SearchService, private issuesComponent: IssuesComponent, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    // Initializes the search svg icon
    this.searchIcon = this.sanitizer.bypassSecurityTrustHtml(search.toSVG());
  }

  // Updates the repository name to extract the basic info and updated the shared repository name
  sendRepositoryName() {
    this.onNameTyped.emit(this.repositoryName);
    this.searchService.updateRepositoryName(this.repositoryName);
  }
}
