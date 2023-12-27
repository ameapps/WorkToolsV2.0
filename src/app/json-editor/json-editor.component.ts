import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.css']
})
export class JsonEditorComponent implements OnInit {

  sub: Subscription | undefined;

  choosenOption = -1;
  options = [
    'Add to each objects',
    'Edit from each objects',
    'Delete from each objects',
    'Move from each objects',
    'Change all field value',
    'Extract JSON object leaves',
    'Replace JSON object leaves'
  ];

  input = '';
  output = '';
  jsonValue: object[] = [];

  constructor() { }

  ngOnInit() {
    
  }

  onKey() {
    this.jsonValue = JSON.parse(this.input);
  }

  
  onSel(event: number) {
    this.choosenOption = event;
  }

}