import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid'; 

@Component({
  selector: 'app-prev-entry',
  templateUrl: './prev-entry.component.html',
  styleUrls: ['./prev-entry.component.scss']
})
export class PrevEntryComponent implements OnInit {
  @Input() data: any;

  workForm: any;
  totalTime = "0:00"
  curr_date: any;

  constructor() { }

  

  ngOnInit(): void {
    this.workForm = new FormGroup({
      "workDone": new FormControl(this.data.project.project_name, [Validators.required],),
      "startTime": new FormControl(this.data.timings.start_time, [Validators.required, Validators.pattern('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')],),
      "endTime": new FormControl(this.data.timings.end_time, [Validators.required, Validators.pattern('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')],),
      "date": new FormControl(this.data.date, [Validators.required],),
    },
      {
        validators: this.timeValidator('startTime', 'endTime')
      })

   
    this.totalTime = `${this.data.total_time[0]}:${this.data.total_time[1]}`;
    
    this.curr_date = new Date(this.data.date).toDateString().slice(0,10)

  }

  setData() {
    let work = {
      id: uuidv4(),
      date: this.workForm.value.date,
      project: {
        project_name : this.workForm.value.workDone ,
        description : this.workForm.value.description,
      },
      timings: {
        start_time : this.workForm.value.startTime,
        end_time : this.workForm.value.endTime,
      }
    };

    let [t1hr, t1min]:any = work.timings.start_time.split(':');
    let [t2hr, t2min]:any = work.timings.end_time.split(':');
    this.totalTime = `${t2hr - t1hr}:${t2min - t1min}`;

    if (work && work.date && work.timings.start_time && work.timings.end_time) {
      
      localStorage.setItem(Date.now().toString(), JSON.stringify(work));
    }
    else {
      console.log(`some error while saving entry`);
    }
    
  }


  get title() {
    return this.workForm.get('workDone');
  }

  private timeValidator(stime: string, etime: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const valT1 = formGroup.get(stime)?.value;
      const valT2 = formGroup.get(etime)?.value;

      const [t1hr, t1min] = valT1.split(':');
      const [t2hr, t2min] = valT2.split(':');

      if (t2hr > t1hr || (t2hr == t1hr && t2min > t1min)) {
        return null;
      }
      else {
        return { inValidTime: true }
      }

    }
  }

}
