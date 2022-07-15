import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  url: string = "http://localhost:3300/user/";

  newEntry = new Subject<any>();

  constructor(private http: HttpClient) { }

  getEntries() {
    return this.http.get(this.url + "allentries")    
  }

  addEntry(data: any) {
    return this.http.post(this.url + "entry", data)
  }
}
