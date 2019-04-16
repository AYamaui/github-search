import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BasicInfo } from '../../models/basic-info/basic-info';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {

  @Input() basicInfo: BasicInfo;
  @Output() public onIssuesClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  getIssues() {
    this.onIssuesClicked.emit();
  }

}
