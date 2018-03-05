import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keyword-management',
  templateUrl: './keyword-management.component.html',
  styleUrls: ['./keyword-management.component.scss']
})
export class KeywordManagementComponent implements OnInit {

  RD = false; // Remove duplicates
  MP = false; // Maintain phrases
  RSW = false; // Remove single word
  RSL = false; // Remove single letter
  OWPL = false; // One word/pharse per line

  processed = false;

  detectArray = [];

  // Initial Object
  keyword = {
    editable: true,
    value: '',
    length: 'Words: 0, Characters: 0',
    array: [],
    record: ''
  };
  used = '';
  title = {
    value: '',
    max: 50,
    length: 'Words: 0, Characters: 0/500',
    array: []
  };
  description = {
    value: '',
    max: 200,
    length: 'Words: 0, Characters: 0/2000',
    array: []
  };

  constructor() { }

  ngOnInit() {
  }

  // Make the keyword field editable
  editKey() {
    this.keyword.editable = true;
    this.processed = false;
  }

  saveKeyword() {
    this.keyword.record = this.keyword.value;
    const words = this.saveWord(this.keyword.value).length;
    this.keyword.length = 'Words: ' + words + ', Characters: ' + this.keyword.value.length;
  }

  detectInput() {
    this.keyword.editable = false;
  }

  restore() {
    this.keyword.value = this.keyword.record;
    this.processed = false;
  }

  process() {
    const temp = this.lowercase(this.keyword.value);

    if (this.MP) {
      this.keyword.array = this.savePhrases(temp);
    } else {
      this.keyword.array = this.saveWord(temp);
    }

    if (this.RD) {
      this.keyword.array = this.RemoveDuplicates(this.keyword.array);
    }

    if (this.RSL) {
      this.keyword.array = this.removeSignleLetters(this.keyword.array);
    }

    if (this.RSW) {
      this.keyword.array = this.removeSingleWord(this.keyword.array);
    }

    if (this.OWPL) {
      this.keyword.value = this.oneWordPerLine(this.keyword.array);
    } else {
      if (this.MP) {
        this.keyword.value = this.printPharse(this.keyword.array);
      } else {
        this.keyword.value = this.printArray(this.keyword.array);
      }
    }
    this.processed = true;
  }

  saveWord(string) {
    const array = string.split(/[^A-Za-z0-9]+/);
    if (array[array.length - 1] === '') {
        array.splice(array.length - 1, 1);
    }
    return array;
  }

  savePhrases(string) {
    let array = string.split(/[^A-Za-z0-9 ]+/);
    array = array.map(word => {
        if (word.substring(0, 1) === ' ') {
            // word start with space
            word = word.substring(1, word.length);
        }
        return word;
    });
    if (array[array.length - 1] === '') {
        array.splice(array.length - 1, 1);
    }
    return array;
  }

  RemoveDuplicates(array) {
    this.keyword.array = Array.from(new Set(array));
    return this.keyword.array;
  }

  lowercase(string) {
      string = string.toLowerCase();
      return string;
  }

  removeSignleLetters(array) {
      return array.filter(element => element.length !== 1);
  }

  removeSingleWord(array) {
    array = array.filter(element => {
          return element.indexOf(' ') !== -1;
    });
    return array;
  }

  // Output elemetent in an array to one string
  printArray(array) {
      // Output the element in the array to a String
      let str = '';

      for (let i = 0; i < array.length; i++) {
          if (i !== array.length - 1) {
              str = str + array[i] + ' ';
          } else {
            // Do not output last ' ', that count 1 character and people can't see
              str = str + array[i];
          }
      }
      return str;
  }

  printPharse (array) {
    let str = '';

    for (let i = 0; i < array.length; i++) {
        if (i !== array.length - 1) {
            str = str + array[i] + ', ';
        } else {
          // Do not output last ' ', that count 1 character and people can't see
            str = str + array[i];
        }
    }
    return str;
  }

  oneWordPerLine(array) {
      let str = '';

      for (let i = 0; i < array.length; i++) {
          if (i !== array.length - 1) {
              str = str + array[i] + '\n';
          } else {
              str = str + array[i];
          }
      }
      return str;
  }

}
