import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fba-calculator',
  templateUrl: './fba-calculator.component.html',
  styleUrls: ['./fba-calculator.component.scss']
})
export class FbaCalculatorComponent implements OnInit {

  weight: number;
  height: number;
  length: number;
  width: number;
  price = 0;
  isCloth = false;

  constructor() { }

  ngOnInit() {
  }

  FbaCal() {

    // Amazon Charge fee standard
    const clothCharge = 0.4;
    const smallPrize = 2.41;
    const largePrize1 = 3.19; // large size weight less than 1 lb;
    const largePrize2 = 4.71; // Large size wiehgt between 1 to 2 lbs;
    const largePrizeOver2 = 0.38; // Large size price for over 2 lbs;
    const smallOverPrize = 8.13;
    const smallOverPrizeOver = 0.38; // Small Overesize price for over 2 lbs;
    const mediumOverPrize = 9.44;
    const mediumOverPrizeOver = 0.38; // Medium Overesize price for over 2 lbs;
    const largeOverPrize = 73.18;
    const largeOverPrizeOver = 0.79; // Large Overesize price for over 90 lbs;
    const specialOverPrize = 137.32;
    const specialOverPrizeOver = 0.91; // Special Overesize price for over 90 lbs;

    const dimension = [this.height, this.length, this.width];

    if (this.isCloth) {
      this.price += clothCharge;
    }
      let long, mid, short;
      long = Math.max(this.height, this.length, this.width); // Find the longest side
      short = Math.min(this.height, this.length, this.width); // Find the shortest side
      // Find the medium side
      mid = dimension.filter(item => {
          return (item !== long && item !== short);
      });
      if (mid.length === 0) {
          mid = [long];
      }
      const size = this.sizeCheck (long, mid[0], short, this.weight);
        switch (size) {
            case 'small':
                this.price += smallPrize;
                break;
            case 'large':
                if (this.weight <= 1) {
                    this.price += largePrize1;
                } else if (this.weight > 1 && this.weight <= 2) {
                    this.price += largePrize2;
                } else {
                    this.price += largePrize2 + (this.weight - 2) * largePrizeOver2;
                }
                break;
            case 'smallOversize':
                this.price += smallOverPrize + (this.weight - 2) * smallOverPrizeOver;
                break;
            case 'mediumOversize':
                this.price += mediumOverPrize + (this.weight - 2) * mediumOverPrizeOver;
                break;
            case 'largeOversize':
                this.price += largeOverPrize + (this.weight - 90) * largeOverPrizeOver;
                break;
            case 'specialOversize':
                this.price += specialOverPrize + (this.weight - 90) * specialOverPrizeOver;
                break;
        }
        this.price = Number(this.price.toFixed(2));
  }
  sizeCheck (long, mid, short, weight) {
      const lPlusGirth = long + (mid + short) * 2; // long plus girth

      // Amazon Size Standard
      if (long <= 15 && short <= 0.75 && mid <= 12 && weight <= 1) {
          return 'small';
      } else if (long <= 18 && short <= 8 && mid <= 14 && weight <= 20) {
          return 'large';
      } else if (long <= 60 && mid <= 30 && lPlusGirth <= 130 && weight <= 70) {
          return 'smallOversize';
      } else if (long <= 108 && lPlusGirth <= 130 && weight <= 150) {
          return 'mediumOversize';
      } else if (long <= 108 && lPlusGirth <= 165 && weight <= 150) {
          return 'largeOversize';
      } else {
          return 'specialOversize';
      }
  }
}
