import { ɵHttpInterceptingHandler } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-field-value',
  templateUrl: './change-field-value.component.html',
  styleUrls: ['./change-field-value.component.css'],
})

/**
 * KNOWN BUGS: 
 *  •  When a number follows the number field, it is not changed
 *  •  when a field name is followes by an empty string, it is not modifieed
 */
export class ChangeFieldValueComponent implements OnInit {
  @Input() input = '';

  fieldToChange = '';
  changeToApply = '';
  selectedValue = -1;

  options = ['---No value---', 'uuuId'];

  output = '';
  dupplicateValues: any[] | undefined;

  constructor() { }

  ngOnInit() { }

  onKeyUp() { }

  onSelectChange() {
    if (this.selectedValue === 0) {
      return;
    }
    this.changeToApply = `***COMMAND_${this.options[this.selectedValue]}***`;
    const output = this.writeAllValues();
    this.output = output;
  }

  // #region uuuids

  /*
    conto nella stringa il numero di valori da sostituire.
    genero lo stesos numero di valori che li andranno a sostituire.
    li sostituisco.
  */
  writeAllValues(): string {
    const numOccurrences = this.substringOccurrencesNumber(
      this.input,
      this.fieldToChange
    );
    const uuuids: string[] = this.getSubstituteValues(numOccurrences);
    const output = this.replaceValues(this.input, this.fieldToChange, uuuids);
    return output;
  }

  // #region replace values of a json string of a specified field name

  /**Method replacing the old field values of the specified json string
   *  with the new specified values.
   * This method's working is based on the fact that
   * JavaScript's replace method only substitutes the
   * first occurence. Getting an array of the values that
   * must be substitued by parsing the input string, is
   * possibile to apply a sostitution for each of those
   * words with any other word.
   * @param input input json string containing the valeus to replace at the specified field name
   * @param fieldToChange name of the field to change
   * @param uuuids string array containg the values which will be placed instead of the old values
   */
  replaceValues(input: string, fieldToChange: string, uuuids: string[]) {
    const toSubstitue: string[] = this.getTobeSubstitued(input, fieldToChange);
    this.dupplicateValues = this.findDuplicates(toSubstitue);
    toSubstitue.forEach((sobstitute, index) => {
      input = input.replace(sobstitute, uuuids[index]);
    });
    return input;
  }

  // #region get values to be substituted

  /**Method getting all the values that will be replaced into the string
   * @param input input json string containing the valeus to replace at the specified field name
   * @param fieldToChange name of the field to change
   * EXAMPLE:
   * input = {"id": "ciao", "bla" : {  "id" : "33"}}
   * fieldToChange = "id"
   * var result = ["ciao", "33"]
   */
  getTobeSubstitued(input: string, fieldToChange: string): string[] {
    let index = -1;
    const toBeSubstituted: string[] = [];
    const substrCount = this.substringOccurrencesNumber(input, `"${fieldToChange}"`);
    for (let i = 0; i < substrCount; i++) {
      index = i + 1;
      const fieldIndex = this.getSubstringPosition(input, `"${fieldToChange}"`, index);
      const wordApexes: string = this.getObjByIndex(input, fieldIndex);
      const word = wordApexes.substring(1, wordApexes.length - 1);
      toBeSubstituted.push(word);
    }

    return toBeSubstituted;
  }

  /**Getting the field value given the first '"' field's char.AGGIUNGERE AGLI HELPERS
   * @param input input json string containing the value of the field name to get
   * @param fieldIndex first '"" character index of the field having the value to get
   * EXAMPLE:
   * input = {"id": "ciao", "bla" : {  "id" : "33"}}
   * fieldIndex = 2 (ie, '"' in "id")
   * var result = "ciao"
   */
  getObjByIndex(input: string, fieldIndex: number): string {
    // moving out of the fiels index of '"'
    fieldIndex += `"${this.fieldToChange}"`.length;

    // looking for the initial index
    while (input[fieldIndex] !== '"') {
      ++fieldIndex;
    }
    const start = fieldIndex;

    // Moving to the index next to '"'
    fieldIndex += 1;

    // looking for the final index
    while (input[fieldIndex] !== '"') {
      ++fieldIndex;
    }

    const end = fieldIndex + 1;

    // getting the word between initial and final indexes
    const word = this.getWordByIndexes(this.input, start, end);
    return word;
  }

  /**Method getting the subword included between the given indexes AGGIUNGERE AGLI HELPERS */
  getWordByIndexes(input: string, start: number, end: number) {
    return input.substring(start, end);
  }

  // #endregion

  // #endregion


  /**Ottengo i valori da rimpiazzare al posto dei valori vecchi */
  getSubstituteValues(numOccurrences: number) {
    let values: string[] = [];

    /* PER MOTIVI IGNOTI, NON FUNZIONA! CAPIRE PERCHE! */
    /* SENZA QUESTO SWITCH NON POSSO PERMETTERE AL COMPONENTE DI 
       SOSTITUIRE IN PIU' MODI IL VALORE  */
    // switch(this.selectedValue) {
    //   case 1:
    //     console.log('fire') // NON entro qui!
    //     values  = this.getUUUids(numOccurrences);
    //     break;
    // }

    values = this.getUUUids(numOccurrences);

    return values;
  }

  /**making an array of uuuid given having the same specified length */
  getUUUids(numOccurrences: number): any[] {
    const uuuids: string[] = [];
    for (let i = 0; i < numOccurrences; i++) {
      uuuids.push(this.generateUUID());
    }
    return uuuids;
  }

  generateUUID() {
    // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 =
      (typeof performance !== 'undefined' &&
        performance.now &&
        performance.now() * 1000) ||
      0; //Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) {
          //Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }

  // #endregion

  // #region string ɵHttpInterceptingHandler

  /**Metodo che ritorna il numero di volte che una sottostringa è contneuta in una stringa
   * @param word contente le sottostringhe da contare
   * @param subword sottostringa da contare
   */
  substringOccurrencesNumber(word: string, subword: string) {
    let num = -1;
    const arr = word.split(subword);
    num = arr.length - 1;
    return num;
  }

  /**Metodo che permette di ottenere l'indice in cui appare l'occorrenza ennesima della sottostringa nella stirnga.
   * NOTA: l'indice deve partire SEMPRE da 1!
   * ESEMPIO: dato
   * "ab ac ab ad ab ae ab af"
   *  • la prima occorrenza di ab si trova all'indice 0
   *  • la seconda occorrenza di ab si trova all'indice 3
   *  • la terza occorrenza di ab si trova all'indice 5
   *  • ecc..
   */
  getSubstringPosition(bbcode: string, subString: string, index: number): number {
    return bbcode.split(subString, index).join(subString).length;
  }

  // #endregion

  // #region array helpers 

  /**Method getting the dupplicate values included into the specified array.
   * @arr array to analyse
   */
  findDuplicates(arr: any[]) {
    let sorted_arr = arr.slice().sort(); // You can define the comparing function here. 
    // JS by default uses a crappy string compare.
    // (we use slice to clone the array so the
    // original array won't be modified)
    let results = [];
    for (let i = 0; i < sorted_arr.length - 1; i++) {
      if (sorted_arr[i + 1] == sorted_arr[i]) {
        results.push(sorted_arr[i]);
      }
    }
    return results;
  }

  // #endregion
}
