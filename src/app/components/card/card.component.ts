import { Component, effect } from '@angular/core';
import { UserRoot } from '../../models/user-model';
import { UserService } from '../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  user!: UserRoot;

  constructor(private userService: UserService) {
    effect(() => {
      this.user = this.userService.getUsers()[0];
      // const users = this.userService.getUsers();
      // this.user = users[0];
      // console.log('Card: ', this.user);
    });
  }
}
