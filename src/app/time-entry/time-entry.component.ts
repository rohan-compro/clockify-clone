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
  constructor(private entryService: EntryService) {
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

  formatTime(time: any) {
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
    return this.formatTime([`${Math.floor(timeDiff/60)}`, `${timeDiff % 60}`]);
  }
  setData() {
    this.totalTime = this.generateTimeDiff(this.workForm.value.startTime, this.workForm.value.endTime)
    let work = {
      "date": this.workForm.value.date,
      "project": {
        "project_name": this.workForm.value.workDone,
      },
      "timings": {
        "start_time": this.workForm.value.startTime,
        "end_time": this.workForm.value.endTime,
      },
      "total_time": this.totalTime,
    };
    this.entryService.addEntry(work);
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
