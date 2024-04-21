import { Component, effect } from '@angular/core';
import { SignalService } from '../../services/signal.service';

@Component({
  selector: 'app-signal-receiver',
  standalone: true,
  imports: [],
  templateUrl: './signal-receiver.component.html',
  styleUrl: './signal-receiver.component.scss',
})
export class SignalReceiverComponent {
  messageReceived!: string;
  constructor(private signalService: SignalService) {
    effect(() => {
      this.messageReceived = this.signalService.getMessage();
    });
  }
}
