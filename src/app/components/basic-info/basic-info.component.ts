import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { BasicInfo } from '../../models/basic-info/basic-info';
import { SearchService } from '../../services/search/search.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {

  public basicInfo: BasicInfo;
  public repositoryName: string;
  public repositoryFullName: string;

  @Output() public onBasicInfoRetrieved = new EventEmitter<BasicInfo>(); // Event triggered when the basic information is retrieved

  constructor(private searchService: SearchService) {

    // The BasicInfoComponent subscribes to an observer to receive the repository name
    this.searchService.onNameTyped.subscribe((repositoryName) => {

      if (repositoryName) {
        this.repositoryName = repositoryName;
        this.getBasicInfo();
      }
    });
  }

  ngOnInit() {}

  // Retrieves the basic information from the SearchService and saves it into the basicInfo property
  getBasicInfo() {

    this.searchService.getBasicInfo(this.repositoryName).subscribe( (basicInfo) => {
      this.basicInfo = basicInfo;
      this.repositoryFullName = basicInfo.fullName;

      this.sendBasicInfo();
    });
  }

  // Sends the basic information with an event
  sendBasicInfo() {
    this.onBasicInfoRetrieved.emit(this.basicInfo);
  }

}
