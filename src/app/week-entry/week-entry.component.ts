import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-week-entry',
  templateUrl: './week-entry.component.html',
  styleUrls: ['./week-entry.component.scss']
})
export class WeekEntryComponent implements OnInit {
  @Input() weekData: any;
  @Input() weekIndex: any;

  week_total_time: string[] = ["00", "00"];
  startDate: string = ""
  endDate: string = ""



  constructor() { }

  ngOnInit(): void {
    this.week_total_time = this.format_time(this.findWeekTotalTime(this.weekData))
    
    let monday = this.getMonday(new Date(this.weekData[0].date).toString());
    this.startDate = monday.toString().slice(4,10);
    this.endDate = new Date(monday.setDate(monday.getDate() + 4)).toString().slice(4,10);
  }

  findWeekTotalTime(week: any) {
    let min = 0, hr = 0, carry = 0;
    for (let day of week) {
      let day_hr = parseInt(day.total_time[0]);
      let day_min = parseInt(day.total_time[1]);

      min += day_min;
      hr += day_hr;
    }
    carry = Math.floor(min / 60);
    min = min % 60;
    hr += carry;
    return [`${hr}`, `${min}`];
  }

  format_time(time: any) {
    if (time[0].length < 2) {
      time[0] = "0" + time[0];
    }

    if (time[1].length < 2) {
      time[1] = time[1] + "0";
    }

    return time;
  }

  getMonday(dt:string) {
    let d = new Date(dt);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

}
