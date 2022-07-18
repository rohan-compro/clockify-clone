import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Subject } from 'rxjs';
import {url_config} from '../config/config'


@Injectable({
  providedIn: 'root'
})
export class EntryService {

  newEntry = new Subject<any>();

  constructor(private http: HttpClient) { }

  getEntries() {
    return this.http.get(url_config.get_entries_url);    
  }

  addEntry(data: any) {
    return this.http.post(url_config.add_entry, data).subscribe((result) => {
      this.newEntry.next(result);
    })
  }
}
