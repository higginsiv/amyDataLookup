import {Component, OnInit} from '@angular/core';
declare var require: any;

@Component({
  selector: 'app-get-data',
  templateUrl: './get-data.component.html',
  styleUrls: ['./get-data.component.less']
})
export class GetDataComponent implements OnInit {
    csvString;
    jsonData = null;
    fileToProcess: File = null;
    headers = null;
    displayData = [];
  constructor() {}

  ngOnInit() {
  }

  handleFileInput(files: FileList) {
      this.fileToProcess = files.item(0);
      var reader = new FileReader();
      var Papa = require('papaparse');

      reader.onload = (ev => {
          this.csvString = reader.result;
          console.log(this.csvString);
          this.jsonData = Papa.parse(this.csvString);
          console.log(this.jsonData);
          this.generateHeaders();
      });
      reader.readAsText(this.fileToProcess);
  }

  generateHeaders() {
      if (this.jsonData && this.jsonData.data) {
          this.headers = this.jsonData.data[0];
          this.jsonData.data.shift();
      }
  }

  getRows() {
      let storeNumber = (<HTMLInputElement>document.getElementById('storeNumber')).value;
      console.log(storeNumber);
      if (this.displayData == null) {
          this.displayData = []
      }
      for (var i = 0; i < this.jsonData.data.length; i++) {
          if (this.jsonData.data[i][0] == storeNumber) {
              this.displayData.push(this.jsonData.data[i]);
          }
      }
  }
}
