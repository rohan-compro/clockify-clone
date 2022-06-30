import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss']
})
export class TimeTableComponent implements OnInit {
  allEntries: any = [];
  weekValue: any = [];
  weeksArray: any[][] = []

  week_time: string = "0:00";

  constructor() { }

  getAllStorage() {
    let keys = Object.keys(localStorage), i = keys.length;

    while (i--) {
      if (localStorage.getItem(keys[i]) !== null) {
        this.allEntries.push(JSON.parse(localStorage.getItem(keys[i]) || '{}'));
      }
    }
  }

  getWeekNumber(date: any) {
    let currentdate = new Date(date)
    var oneJan = new Date(currentdate.getFullYear(), 0, 1).getTime();
    var numberOfDays = Math.floor((currentdate.getTime() - oneJan) / (24 * 60 * 60 * 1000));
    return Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
  }

  fillWeekArrays(week_number: number) {
    return this.allEntries.filter((obj: any) => {
      return this.getWeekNumber(obj.date) == week_number;
    })
  }


  ngOnInit(): void {
    this.getAllStorage();
    // console.log(this.allEntries);

    let curr_week_value = this.getWeekNumber(new Date());


    // fill array with week values: 28,29,30,31,32
    for (let i = 0; i < 5; i++) {
      this.weekValue.push(curr_week_value - i);
    }


    // fill weeksArray with each week data
    for (let val of this.weekValue) {
      let array = this.fillWeekArrays(parseInt(val))

      if (array.length > 0) {
        this.weeksArray.push(array);
      }
    }

    // console.log(this.weeksArray);


  }

}
