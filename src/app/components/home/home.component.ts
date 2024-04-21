import { Component, OnInit, effect } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SignalService } from '../../services/signal.service';
import { CoreService } from '../../services/core.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(
    private signalService: SignalService,
    private userService: UserService,
    private coreService: CoreService
  ) {
    effect(() => {
      this.selectedDate = this.coreService.getDate();
    });
  }

  selectedDate!: string;
  messaage!: string;
  ngOnInit(): void {}

  sendSignal() {
    let randomMsg = Math.random().toString();
    this.messaage = randomMsg;
    this.signalService.sendMessage(randomMsg);
  }

  fetchUsers() {
    this.userService.fetchUsers();
  }
}
