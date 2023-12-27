import { Injectable } from '@angular/core';

@Injectable()
export class JsonLeavesService {

  constructor() { }

  getLeaves(jsonObj: any) {
    let leaves: any[] = [];
    
    // controlla se l'oggetto è un array
    if (Array.isArray(jsonObj)) {
      for (let i = 0; i < jsonObj.length; i++) {
        // se l'elemento corrente è un array o un oggetto, chiama ricorsivamente getLeaves
        if (typeof jsonObj[i] === 'object') {
          leaves = leaves.concat(this.getLeaves(jsonObj[i]));
        }
      }
    }
    // controlla se l'oggetto è un oggetto JSON
    else if (typeof jsonObj === 'object') {
      for (let key in jsonObj) {
        // se il valore corrente è un array o un oggetto, chiama ricorsivamente getLeaves
        if (typeof jsonObj[key] === 'object') {
          leaves = leaves.concat(this.getLeaves(jsonObj[key]));
        } 
        // se il valore corrente non è un oggetto, lo aggiunge all'array leaves
        else {
          leaves.push(jsonObj[key]);
        }
      }
    }
    
    return leaves;
  }

}