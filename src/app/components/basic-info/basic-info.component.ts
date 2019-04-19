import { Component, Input, OnInit } from '@angular/core';
import { BasicInfo } from '../../models/basic-info/basic-info';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {

  @Input() basicInfo: BasicInfo;

  constructor() { }

  ngOnInit() {

  }

}
