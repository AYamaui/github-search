import { Component, OnInit } from '@angular/core';
import { BasicInfo } from '../../models/basic-info/basic-info';
import { SearchService } from '../../services/search/search.service';

// Main component that contains the SearchInputComponent and the BasicInfoComponent
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public repositoryName: string;
  public repositoryFullName: string; // Repository full name (owner/repository)
  public basicInfo: BasicInfo; // BasicInfo object that contains the repository basic information

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
    this.basicInfo = JSON.parse(localStorage.getItem('basicInfo'));
  }

  // Retrieves the basic information from the SearchService and saves it into the basicInfo property
  getBasicInfo() {

    this.searchService.getBasicInfo(this.repositoryName).subscribe( (basicInfo) => {
      this.basicInfo = basicInfo;
      this.repositoryFullName = basicInfo.fullName;
      localStorage.setItem('basicInfo', JSON.stringify(this.basicInfo));
    });

  }
}
