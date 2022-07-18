import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loadingSubject = new BehaviorSubject<boolean>(false);
  public readonly loadingObs = this._loadingSubject.asObservable();
  constructor() { }
  show() {
    this._loadingSubject.next(true);
  }
  hide() {
    this._loadingSubject.next(false);
  }
}