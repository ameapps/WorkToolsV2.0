import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;

  selFunct = -1;
  functions = [ 
    'Dynamic table based on JSON', 
    "Json editor",
    "Date and time utilities"
  ];

  onSel(event: number) {
    this.selFunct = event;
  }

  // #region code

/**Generating all the decimal number between the specified extreemes.  */
generateDecimalSeries(start: any, end: number, decimals: number) {

  const numbers: string[] = [];
  const limit = Math.pow(10, decimals);

  // getting the x axis values
  const decimalNumbers = this.getDecimals(limit);

  // Generating the decima for each integer value between the specified range
  let counter = 0;
  for (let index = start; index < end; index++) {
      const element = index;
      
      decimalNumbers.forEach(decimal => {
          const num = `${element}.${decimal}`;
          numbers.push(num);
          ++counter;
      });
  }

  return numbers;
}

/**Getting the series of numbers from 0 until the specified limit.
* @limit number that will stop incrementing and pushing in the array
*/
getDecimals(limit: number) {
  let num = 0;
  const decimalsNums = [];
  while (num < limit) {
      decimalsNums.push(num);
      ++num;
  }

  return decimalsNums;
}

// #region format the outputFormat

analyzeFormatOutput(outputFormat: { [x: string]: boolean; }, series: any) {
  let output: never[] = [];
  const keys = Object.keys(outputFormat);
  keys.forEach(key => {
      if(outputFormat[key] === true) {
          output = this.formatOutput(key, series);
      }
  });

  return output;
}

formatOutput(key: string, series: any) {
  let output = []; 
  switch (key) {
      case 'lightningChart':
          output = this.formatLightningChart(series);
          break;
      case 'array':
          output = this.formatAsArray(series);
          break;
  }
  return output; 
}

// #region format lightningChart

/**getting a string including the values to pass to a lightning chart values */
formatLightningChart(series: any[]) {
  const values: string[] = [];
  series.forEach((element, index) => {
      const arrValue = `\n{ x: ${element}, y: ${index} }`;
      values.push(arrValue);
  });

  return values;
}

//#endregion

// #region format as array

formatAsArray(series: any) {
  return series; 
}

//#endregion


//#endregion


//#endregion



}
