import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid'; 

@Component({
  selector: 'app-time-entry',
  templateUrl: './time-entry.component.html',
  styleUrls: ['./time-entry.component.scss']
})
export class TimeEntryComponent implements OnInit {
  workForm: FormGroup;
  totalTime = '0:00';
  isManual: boolean = true;
  

  constructor() { this.workForm = new FormGroup({
    "workDone": new FormControl("", [Validators.required], ),
    "startTime": new FormControl("0:00", [Validators.required, Validators.pattern('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')], ),
    "endTime": new FormControl("0:00", [Validators.required, Validators.pattern('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')], ),
    "date": new FormControl("", [Validators.required], ),
  },
    {
    validators: this.timeValidator('startTime', 'endTime')
  })}

  ngOnInit(): void { 
    
  }

  setData() {
    console.log(this.workForm.value);
    
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
      console.log(`some error occurred while saving to local storage`);
    }
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
