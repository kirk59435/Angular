import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keyword-management',
  templateUrl: './keyword-management.component.html',
  styleUrls: ['./keyword-management.component.scss']
})
export class KeywordManagementComponent implements OnInit {

  RD = true; // Remove duplicates
  MP = false; // Maintain phrases
  RSW = false; // Remove single word
  RSL = false; // Remove single letter
  OWPL = false; // One word/pharse per line
  processed = false;

  detectArray = [];
  extraString = '';
  unused = [];
  count = 0;

  // Initial Object
  keyword = {
    editable: true,
    value: '',
    length: 'Words: 0, Characters: 0',
    array: [],
    record: ''
  };
  used = {
    value: '',
    array: []
  };
  title = {
    value: '',
    max: 50,
    length: 'Words: 0, Characters: 0/50',
    array: [],
    format: 'initial'
  };
  description = {
    value: '',
    max: 200,
    length: 'Words: 0, Characters: 0/200',
    array: [],
    format: 'initial'
  };
  extra1 = {
    value: '',
    max: 200,
    length: 'Words: 0, Characters: 0/200',
    array: [],
    display: false,
    format: 'initial'
  };
  extra2 = {
    value: '',
    max: 200,
    length: 'Words: 0, Characters: 0/200',
    array: [],
    display: false,
    format: 'initial'
  };
  extra3 = {
    value: '',
    max: 200,
    length: 'Words: 0, Characters: 0/200',
    array: [],
    display: false,
    format: 'initial'
  };

  constructor() { }

  ngOnInit() {
  }

  // Make the keyword field editable
  editKey() {
    this.keyword.value = this.keyword.record;
    this.keyword.editable = true;
    this.processed = false;
  }

  saveKeyword() {
    this.keyword.record = this.keyword.value;
    const words = this.saveWord(this.keyword.value).length;
    this.keyword.length = 'Words: ' + words + ', Characters: ' + this.keyword.value.length;
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

  // Change the character limition
  changeLimit(obj) {
    const newLimit = prompt('Enter new character limit : '); // Need to change to using dialog
    if (newLimit) {
        obj.max = newLimit;
    }
    this.getInfo();
  }

  // Get the user input in Title and Description field
  getInfo() {
    const title = this.saveWord(this.title.value).length;
    const description = this.saveWord(this.description.value).length;
    const extra1 = this.saveWord(this.extra1.value).length;
    const extra2 = this.saveWord(this.extra2.value).length;
    const extra3 = this.saveWord(this.extra3.value).length;

    this.extraString = this.extra1.value + ',' + this.extra2.value + ',' + this.extra3.value;

    this.title.length = 'Words: ' + title + ', Characters: ' + this.title.value.length + '/' + this.title.max;
    this.description.length = 'Words: ' + description + ', Characters: ' + this.description.value.length + '/' + this.description.max;
    this.extra1.length = 'Words: ' + extra1 + ', Characters: ' + this.extra1.value.length + '/' + this.extra1.max;
    this.extra2.length = 'Words: ' + extra2 + ', Characters: ' + this.extra2.value.length + '/' + this.extra2.max;
    this.extra3.length = 'Words: ' + extra3 + ', Characters: ' + this.extra3.value.length + '/' + this.extra3.max;
  }

  // Prepare for compare the keyword with user input
  detectInput() {
    this.title.format = 'initial';
    this.description.format = 'initial';
    this.extra1.format = 'initial';
    this.extra2.format = 'initial';
    this.extra3.format = 'initial';
    this.keyword.editable = false;

    // Make sure process funcation run and only run once
    if (this.processed === false) {
        this.process();
    }

    this.getInfo();

    if (this.MP) {
      this.detectArray = this.savePhrases(this.title.value).concat(this.savePhrases(this.description.value))
      .concat(this.savePhrases(this.extraString));
    } else {
      this.detectArray = this.saveWord(this.title.value).concat(this.saveWord(this.description.value))
      .concat(this.saveWord(this.extraString));
    }

    // Clear used array in case user delete the key-word type in title
    this.used.array = [];
    this.compareWord(this.keyword.array, this.detectArray);
  }

  // Compare the keyword with user input
  compareWord(keyArray, inputArray) {
    keyArray.forEach(key => {
      inputArray.forEach(input => {
          const condition1 = new RegExp(' ' + key.toLowerCase() + '[^A-Za-z0-9]');
          const condition2 = new RegExp(key.toLowerCase() + '[^A-Za-z0-9]');
          const condition3 = new RegExp(' ' + key.toLowerCase());
          if (key.toLowerCase() === input.toLowerCase() || condition1.test(input.toLowerCase()) ||
          condition2.test(input.toLowerCase()) || condition3.test(input.toLowerCase())) {
            this.used.array.push(key);
          }
      });
    });
    // Remove the duplicate word in the used array
    // the duplicate may happen if user type in a same key word in key-word filed after put it into the title filed
    this.used.array = Array.from(new Set(this.used.array));
    this.display();
  }

  // Display the value in the keyword and used keyword filed
  display() {
    // Return the difference between keyword array and used keyword array
    this.unused = this.keyword.array.filter(word => {
      return this.used.array.indexOf(word) < 0;
    });

    if (this.OWPL) {
      this.keyword.value = this.oneWordPerLine(this.unused);
    } else {
        if (this.MP) {
          this.keyword.value = this.printPharse(this.unused);
        } else {
          this.keyword.value = this.printArray(this.unused);
        }
    }
    this.used.value = this.printArray(this.used.array);
    this.keyword.length = 'Words: ' + this.unused.length + ', Characters: ' + this.keyword.value.length;
  }

  // Format the title and describtion field
  format(value, object) {
    if (value) {
      switch (value) {
        case'ALL CAPS':
          object.value = object.value.toUpperCase();
          break;
        case 'all lowercase':
          object.value = object.value.toLowerCase();
          break;
        case 'First Letter Caps':
          object.value = this.firstLetterCap(object.value);
          break;
        case 'Sentence caps':
          object.value = this.sentenceCaps(object.value);
          break;
        }
    }
  }

  // Capital first letter of every word
  firstLetterCap(string) {
    const temp = this.lowercase(string);
    const array = temp.split(' ');
    for (let i = 0; i < array.length; i++) {
        array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
    }
    array.join(' ');
    return this.printArray(array);
  }

  // Capital first letter of the sentence
  sentenceCaps(string) {
    const temp = this.lowercase(string);
    const array = temp.split('. ');

    for (let i = 0; i < array.length; i++) {
        if (array[i].substring(0, 1) === ' ') {
            array[i] = array[i].substring(1, array[i].length);
        }
        array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
        array[i] = array[i] + '. ';
    }
    return this.printArray(array);
  }

  showBox() {
    this.count++;
    if (this.count === 1) {
      this.extra1.display = true;
    } else if (this.count === 2) {
      this.extra2.display = true;
    } else if (this.count === 3) {
      this.extra3.display = true;
    }
  }
}
