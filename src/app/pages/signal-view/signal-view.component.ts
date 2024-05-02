import { Component } from '@angular/core';
import { SignalReceiverComponent } from '../../components/signal-receiver/signal-receiver.component';

@Component({
  selector: 'app-signal-view',
  standalone: true,
  imports: [SignalReceiverComponent],
  templateUrl: './signal-view.component.html',
  styleUrl: './signal-view.component.scss',
})
export class SignalViewComponent {}
