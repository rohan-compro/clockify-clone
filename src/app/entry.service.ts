import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Subject } from 'rxjs';
import {urlConfig} from '../config/local'

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  newEntrySubject = new Subject<any>();
  constructor(private http: HttpClient) { }
  getEntries() {
    return this.http.get(urlConfig.get_entries_url);    
  }
  addEntry(data: any) {
    return this.http.post(urlConfig.add_entry, data).subscribe((result) => {
      this.newEntrySubject.next(result);
    })
  }
}