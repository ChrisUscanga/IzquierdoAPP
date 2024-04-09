import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private dateSource = new BehaviorSubject<string | undefined>(undefined);
  currentDate = this.dateSource.asObservable();

  constructor() { }

  setDate(date: string) {
    this.dateSource.next(date);
  }
}
