import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-object-editor',
  templateUrl: './object-editor.component.html',
  styleUrls: ['./object-editor.component.css']
})
export class ObjectEditorComponent implements OnInit {

  @Input() input: string | undefined;

  pathToEdit = './';
  changeToApply = '';

  constructor() { }

  ngOnInit() {
  }

  onKeyUp() {
    const input = JSON.parse(this.input ?? '');
    const isArray = Array.isArray(input);
    let result = null; 

    if (isArray) {
      result = null;
    } else {
      result = null;
    }

  }

}