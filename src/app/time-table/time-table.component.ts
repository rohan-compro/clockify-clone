import { Component, OnInit } from '@angular/core';
import * as  moment from 'moment';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss']
})
export class TimeTableComponent implements OnInit {
  allEntries: any =[];
  current_week: any =[];
  last_week: any =[];
  second_last_week: any = [];
  week_time: string = "0:00";
  constructor() { }
  
  getTime(time:string) {
    let d= moment.duration(this.week_time).add(moment.duration(time))
    let x = moment.utc(d.as('milliseconds')).format("HH:mm")
    this.week_time = x;
    
  }

  getAllStorage() {
    let keys = Object.keys(localStorage), i = keys.length;

    while (i--) {
      if (localStorage.getItem(keys[i]) !== null) {
          this.allEntries.push( JSON.parse(localStorage.getItem(keys[i]) || '{}') );  
        }
    }
  }

  fillWeekArrays(week_number:number) {
    return this.allEntries.filter((obj:any) => {
      return moment(obj.date).week() == week_number;
    })
  }

  compareDate(x: any, y: any) {
    
    return (x.date) - (y.date);
  }

  ngOnInit(): void {
    this.getAllStorage();
    console.log(this.allEntries);
    
    let curr_week_number = moment(new Date()).week();
    let last_week_number = curr_week_number - 1;
    let second_last_week_number = curr_week_number - 2;

    this.current_week = this.fillWeekArrays(curr_week_number).sort(this.compareDate)
    this.last_week = this.fillWeekArrays(last_week_number).sort(this.compareDate)
    this.second_last_week = this.fillWeekArrays(second_last_week_number).sort(this.compareDate)
    
    console.log(this.current_week);
    // console.log(this.last_week);
    // console.log(this.second_last_week);
    

  }

}
