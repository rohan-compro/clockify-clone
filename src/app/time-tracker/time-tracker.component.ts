import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.scss']
})
  
export class TimeTrackerComponent implements OnInit {
  workForm: any;
  totalTime = '0:00';
  start = new Date().toTimeString().slice(0,5);
  end = new Date().toTimeString().slice(0,5);
  interval:any;
  todaysDate = new Date().toISOString().slice(0, 10);
  stime = new Date();
  etime= new Date();
  isTimerStarted: boolean = true;
  isManual: boolean = true;
  

  constructor(private fm: FormBuilder) { }

  ngOnInit(): void { 
    this.workForm = this.fm.group({
      workDone: this.fm.control("", [Validators.required], ),
      startTime: this.fm.control("0:00", [Validators.required, Validators.pattern('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')], ),
      endTime: this.fm.control("0:00", [Validators.required, Validators.pattern('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')], ),
      date: this.fm.control("", [Validators.required], ),
    },
      {
      validators: this.timeValidator('startTime', 'endTime')
    })
  }

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

  private timeValidator(stime: string, etime: string): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const valT1 = formGroup.get(stime)?.value;
      const valT2 = formGroup.get(etime)?.value;
    
      const [t1hr, t1min] = valT1.split(':');
      const [t2hr, t2min] = valT2.split(':');

      if (t2hr> t1hr ||  (t2hr==t1hr && t2min>t1min) ) {
        return null;
      }
      else {
        return { inValidTime: true}
      }
    
    }
  }

}


