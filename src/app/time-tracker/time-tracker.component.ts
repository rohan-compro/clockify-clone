import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.scss']
})
  
export class TimeTrackerComponent implements OnInit {

  workForm = new FormGroup({
    workDone: new FormControl("", [Validators.required], ),
    startTime: new FormControl("", [Validators.required, Validators.pattern('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')], ),
    endTime: new FormControl("", [Validators.required, Validators.pattern('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')], ),
    date: new FormControl("", [Validators.required], ),
  })

  totalTime = '0:00';
  interval:any;
  stime = new Date();
  etime= new Date();
  isTimerStarted: boolean = true;
  isManual: boolean= true;

  constructor() { }

  ngOnInit(): void { }


  setData() {
    let work = { ...{}, ...this.workForm.value };
    console.log(work);
    let [t1hr, t1min]:any = work.startTime?.split(':');
    let [t2hr, t2min]:any = work.endTime?.split(':');
    this.totalTime = `${t2hr - t1hr}:${t2min - t1min}`;

    if (work && work.date && work.startTime && work.endTime) {
      
      localStorage.setItem(work.date, JSON.stringify(work));
    }
    else {
      // error msg

    }
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.etime.setSeconds(this.etime.getSeconds() + 1);
    }, 1000);

    this.isTimerStarted = !this.isTimerStarted;
  }

  stopTimer() {
    this.totalTime = ((this.etime.valueOf() - this.stime.valueOf())/1000).toLocaleString();
    clearInterval(this.interval);
    // this.stime.setSeconds(0);
    this.isTimerStarted = !this.isTimerStarted;

  }

  get title() {
    return this.workForm.get('workDone'); 
  }

}
