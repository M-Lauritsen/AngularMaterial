import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  private selectedDate = signal<string>('');
  constructor() {}

  setDate(inputDate: string) {
    this.selectedDate.update(() => inputDate);
  }

  getDate() {
    return this.selectedDate();
  }
}
