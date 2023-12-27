import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-manager',
  templateUrl: './time-manager.component.html',
  styleUrls: ['./time-manager.component.css']
})
export class TimeManagerComponent implements OnInit {

  choosenOption = -1;
  options = [
    'Add decimals at numbers in range'
  ];

  constructor() { }

  ngOnInit() {
  }

  onSel(event: any) {
    this.choosenOption = event;
  }

}