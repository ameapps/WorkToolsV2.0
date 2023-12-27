import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-object-deleter',
  templateUrl: './object-deleter.component.html',
  styleUrls: ['./object-deleter.component.css'],
})
export class ObjectDeleterComponent implements OnInit {
  @Input() input: string | undefined;

  pathToDelete = './';
  result: string | undefined = ''; 

  constructor() {}

  ngOnInit() {}

  onKeyUp() {
    const input = JSON.parse(this.input ?? '');
    const isArray = Array.isArray(input);

    if (isArray) {
      const result = this.deleteObject(input);
      this.result = JSON.stringify(result, null, 2);
    } else {
      this.result = undefined;
    }
  }

  deleteObject(input: any): any {
    const pathToEdit = this.pathToDelete.replace('./', '');
    const keys = pathToEdit.split('.');

    /*deleting the object from ech object */
    const removed = this.removeFromObjects(input, keys)
    console.log(removed)

    return removed;
  }

  /**deleting all objects to be replaced */
  removeFromObjects(input: any[], keys: string | any[]): object[] {
    const objs: object[] = [];
    input.forEach((obj, index) => {
      const last = keys[keys.length - 1];
      delete this.getObj(obj, keys.slice(0, keys.length - 1))[last];
    });

    return input;
  }

  /**Method to get the object by scraping using the keys */
  getObj(obj: any, keys: string | any[]): any {
    let res = obj;
    if (typeof keys === 'string') return;
    keys.forEach((key) => {
      res = res[key];
    });

    return res;
  }
}
