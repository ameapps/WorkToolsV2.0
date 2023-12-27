import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ObjectUnsubscribedError } from 'rxjs';

@Component({
  selector: 'app-object-move',
  templateUrl: './object-move.component.html',
  styleUrls: ['./object-move.component.css']
})
export class ObjectMoveComponent implements OnInit {

  @Input() input = '';

  result = ''; 

  pathToEdit = './';
  changeToApply = './';

  constructor() { }

  ngOnInit() {
  }

  onKeyUp() {
    const input = JSON.parse(this.input);
    const isArray = Array.isArray(input);
    let result = null; 

    if (isArray) {
      result = this.moveArray(input);
      this.result = JSON.stringify(result, null, 2);
    } else {
      result = null;
    }

  }

  moveArray(input: object | object[]) {
    const pathToEdit = this.pathToEdit.replace('./', '');
    const keys = pathToEdit.split('.');
    /*saving the object to move */
    const objs: object[] = this.getEachObjects(input, keys);
    if (!Array.isArray(input)) return;
    /*deleting the object from ech object */
    const removed = this.removeFromObjects(input, keys)
    /*writing saved objects to the input json */
    const result = this.writeObjects(removed, objs)
    console.log(result);

    return result;
  }

  // #region get objects

  /**Geting an array of the object to be moved */
  getEachObjects(input: any, keys: string[]): object[] {
    const objs: object[] = [];
    input.forEach((obj: any, index: any) => {
      const innerobj = this.getObj(obj, keys);
      objs.push(innerobj);
    })

    return objs;
  }

  /**Method to get the object by scraping using the keys */
  getObj(obj: any, keys: any[]): any {
    let res = obj;
    keys.forEach(key => {
      res = res[key];
    })

    return res;
  }

  // #endregion

  // #region delete ObjectUnsubscribedError

  /**deleting all objects to be replaced */
  removeFromObjects(input: object[], keys: any[]): object[] {
    const objs: object[] = [];
    input.forEach((obj: any, index: any) => {
      const last = keys[keys.length -1]
      delete this.getObj(obj, keys.slice(0, keys.length -1))[last];
    })

    return input;
  }
  

  // #endregion

  // #region writing the removed objects


  getLastKey() {
    const keyss = this.pathToEdit.replace('./', '').split('.');
    const lastkey = keyss[keyss.length-1];
    return lastkey;
  }

  writeObjects(removed: any[], objs: any[]) {
    const resultPath = this.changeToApply.replace('./', '')
    const keys = resultPath.split('.');
    // getting last key which is the name of the path to add.
    const lastkey = this.getLastKey();
    // writing the moved object to the defined levels.
    for(let index = 0; index < removed.length; index++) {
      let level = removed[index];
      level = this.getWriteObject(keys, level);
      level[lastkey] = objs[index];
    }

    return removed;
  }

  /**Getting the object where the object to move will be written */
  getWriteObject(keys: string[], level: any): any {
    if (keys != null) {
      keys.forEach((key) => {
        // when key is not part of object, it is added.
        if (level[key] == null) {
          level[key] = {};
        }
        level = level[key];
      })
    } 

    return level;
  }

  // #endregion

}