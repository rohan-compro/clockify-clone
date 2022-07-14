import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  url: string = "http://localhost:3000/user/";

  constructor(private http: HttpClient) { }
  
  getEntries() {
    return this.http.get(this.url + "allentries")    
  }

  addEntry(data: any) {
    return this.http.post(this.url + "entry", data);
  }
}
