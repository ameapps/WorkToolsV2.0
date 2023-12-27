import { Component, Input, OnInit } from '@angular/core';
import { JsonLeavesService } from '../../services/json-leaves.service';

@Component({
  selector: 'app-json-leaves-extractor',
  templateUrl: './json-leaves-extractor.component.html',
  styleUrls: ['./json-leaves-extractor.component.css']
})
export class JsonLeavesExtractorComponent implements OnInit {
  _input:string | undefined;
  @Input() set input(param:string) {
    if (param === '') return; 
    const asObj = JSON.parse(param);
    const result = this.jsonLeaves.getLeaves(asObj); 
    console.log('result')
    console.log(result)
    this.result = JSON.stringify(result);
    navigator.clipboard.writeText(this.result);
    this._input = this.result;
  }


  pathToEdit = './';

  fieldValues = '';

  result = '';

  constructor(private jsonLeaves: JsonLeavesService) { }

  ngOnInit() {
  }

  getLeaves(jsonObj: any[]) {
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
      for (let key in Object.keys(jsonObj)) {
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