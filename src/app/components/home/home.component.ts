import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SignalService } from '../../services/signal.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  providers: [UserService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private signalService: SignalService) {}
  messaage!: string;
  ngOnInit(): void {}

  sendSignal() {
    let randomMsg = Math.random().toString();
    this.messaage = randomMsg;
    this.signalService.sendMessage(randomMsg);
  }
}
