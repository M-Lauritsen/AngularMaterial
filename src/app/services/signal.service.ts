import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SignalService {
  private message = signal<string>('');
  constructor() {}

  sendMessage(msg: string) {
    this.message.update(() => msg);
  }

  getMessage() {
    return this.message();
  }
}
