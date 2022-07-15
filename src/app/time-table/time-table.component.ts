import { Component, OnInit } from '@angular/core';
import { EntryService } from '../entry.service';


@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss']
})
export class TimeTableComponent implements OnInit {
  allEntries: any = [];
  weekValue: any = [];
  weeksArray: any[][] = []

  constructor(private entry: EntryService) { }

  getWeekNumber(date: any) {
    let currentdate:any = new Date(date)
    var oneJan:any = new Date(currentdate.getFullYear(), 0, 1);
    var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
    return Math.ceil(numberOfDays / 7);
  }

  fillWeekArrays(week_number: number) {
    return this.allEntries.filter((obj: any) => {
      return this.getWeekNumber(obj.date) == week_number;
    })
  }

  compare(obj1: any, obj2: any) {
    if (new Date(obj1.date) < new Date(obj2.date)) return 1;
    return -1;
  }

  pushNewEntry(data: any) {
    this.allEntries.push(data);
    this.weeksArray = [];
    for (let val of this.weekValue) {
      let array = this.fillWeekArrays(val).sort(this.compare)

      if (array.length > 0) {
        this.weeksArray.push(array);
      }
    }
  }


  ngOnInit(): void {
    this.entry.getEntries().subscribe((data) => {
      this.allEntries = data

      let curr_week_value = this.getWeekNumber(new Date());

      // fill array with week values: 28,29,30,31,32
      for (let i = 0; i < 5; i++) {
        this.weekValue.push(curr_week_value - i);
      }

      // fill weeksArray with each week data
      for (let val of this.weekValue) {
        let array = this.fillWeekArrays(val).sort(this.compare)

        if (array.length > 0) {
          this.weeksArray.push(array);
        }
      }
    });


    this.entry.newEntry.subscribe((data) => {
      this.pushNewEntry(data);
    })
    
  }

}
