import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-object-adder',
  templateUrl: './object-adder.component.html',
  styleUrls: ['./object-adder.component.css']
})
export class ObjectAdderComponent implements OnInit {

  @Input() input: string | undefined;

  pathToEdit = './';

  fieldValues = '';

  result = '';

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

    const nameToAdd = this.pathToEdit.replace('./', '')
    let inputValues = JSON.parse(this.input ?? '');

    const fieldValues = this.isValuesArray() ? JSON.parse(this.fieldValues) : this.fieldValues;

    /*When input is an array, its values are added to the input. Else, a single value is added to al the objects */
    const added = Array.isArray(fieldValues) ? this.addValues(nameToAdd, inputValues, fieldValues) : this.addValue(nameToAdd, inputValues, fieldValues);

    /*Showing the result in output */
    this.result = JSON.stringify(added, null, 2);

  }

  /**Method adding a single value to all the objects */
  addValue(nameToAdd: string, inputValues: any[], fieldValue: object) {
    for (let i = 0; i < inputValues.length; i++) {
      inputValues[i][nameToAdd] = fieldValue != null ? fieldValue : '';
    }
    return inputValues;
  }

  /**Method adding the specified values to the output json */
  addValues(nameToAdd: string, inputValues: any[], fieldValues: object[]) {
    for (let i = 0; i < inputValues.length; i++) {
      const value = fieldValues[i];
      inputValues[i][nameToAdd] = i <= fieldValues.length ? value : '';
    }
    return inputValues;
  }

  isValuesArray() {
    if (this.fieldValues == null) { return false; }
    if (this.fieldValues.charAt(0) !== '[') { return false; }
    const pseudoarr = JSON.parse(this.fieldValues);
    return pseudoarr != null;
  }
}