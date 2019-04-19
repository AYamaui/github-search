import { Component, EventEmitter, OnInit, Output  } from '@angular/core';
import { SearchService } from '../../services/search/search.service';
import { IssuesComponent } from '../issues/issues.component';
import { search } from '../../../../node_modules/octicons';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// Component that receives the repository name by text input and sends it to the HomeComponent
@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  providers: [IssuesComponent]
})
export class SearchInputComponent implements OnInit {

  public repositoryName: string;
  public searchIcon: SafeHtml;

  // Event sent to the HomeComponent when the search icon is clicked or Enter is pressed
  @Output() public onNameTyped = new EventEmitter<string>();
  @Output() public onEnterPressed = new EventEmitter<string>();

  constructor(private searchService: SearchService, private issuesComponent: IssuesComponent, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    // Initializes the search svg icon
    this.searchIcon = this.sanitizer.bypassSecurityTrustHtml(search.toSVG());
  }

  // Sends the repository name to the HomeComponent to extract the basic info
  sendRepositoryName() {
    this.onNameTyped.emit(this.repositoryName);
  }
}
