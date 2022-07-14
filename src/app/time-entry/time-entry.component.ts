import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { EntryService } from '../entry.service';

@Component({
  selector: 'app-time-entry',
  templateUrl: './time-entry.component.html',
  styleUrls: ['./time-entry.component.scss']
})
export class TimeEntryComponent implements OnInit {
  workForm: FormGroup;
  totalTime: any = ["00", "00"];


  constructor(private entry: EntryService) {
    this.workForm = new FormGroup({
      "workDone": new FormControl("", [Validators.required],),
      "startTime": new FormControl("00:00", [Validators.required, Validators.pattern('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')],),
      "endTime": new FormControl("00:00", [Validators.required, Validators.pattern('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')],),
      "date": new FormControl("", [Validators.required],),
    },
      {
        validators: this.timeValidator('startTime', 'endTime')
      })
  }

  ngOnInit(): void { }

  format_time(time: any) {
    if (time[0].length < 2) {
      time[0] = "0" + time[0];
    }

    if (time[1].length < 2) {
      time[1] = time[1] + "0";
    }

    return time;
  }

  generateTimeDiff(start: any, end:any) {
    let [t1hr, t1min]: any = start.split(':').map(Number);
    let [t2hr, t2min]: any = end.split(':').map(Number);

    let timeDiff = (t2hr * 60) + t2min - (t1hr * 60) - t1min;
    // console.log(timeDiff)
    return this.format_time([`${Math.floor(timeDiff/60)}`, `${timeDiff % 60}`]);

  }
  setData() {
    // console.log(this.workForm.value);
    
    this.totalTime = this.generateTimeDiff(this.workForm.value.startTime, this.workForm.value.endTime)
       
    let work = {
      "date": this.workForm.value.date,
      "project": {
        "project_name": this.workForm.value.workDone,
        // description: this.workForm.value.description,
      },
      "timings": {
        "start_time": this.workForm.value.startTime,
        "end_time": this.workForm.value.endTime,
      },
      "total_time": this.totalTime,
    };

    this.entry.addEntry(work).subscribe((result) => {
      console.log("result", result);
      this.workForm.reset({});
      this.totalTime = ["00", "00"];
    })

    // if (work && work.date && work.timings.start_time && work.timings.end_time) {

    //   localStorage.setItem(new Date(work.date).getTime().toString(), JSON.stringify(work));
    // }
    // else {
    //   console.log(`some error occurred while saving to local storage`);
    // }
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
