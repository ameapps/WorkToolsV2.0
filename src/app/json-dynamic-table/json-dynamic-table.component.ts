import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-json-dynamic-table',
  templateUrl: './json-dynamic-table.component.html',
  styleUrls: ['./json-dynamic-table.component.css']
})
export class JsonDynamicTableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  input = '';
  jsonValue: any[] = [];

  noDescr = 'No description'

  onKey() {
    this.jsonValue = JSON.parse(this.input);
  }

}