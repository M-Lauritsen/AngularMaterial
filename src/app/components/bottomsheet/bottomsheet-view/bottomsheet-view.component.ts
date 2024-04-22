import { Component, effect } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserRoot } from '../../../models/user-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bottomsheet-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bottomsheet-view.component.html',
  styleUrl: './bottomsheet-view.component.scss',
})
export class BottomsheetViewComponent {
  users!: UserRoot[];
  constructor(private userService: UserService) {
    effect(() => {
      this.users = this.userService.getUsers();
    });
  }
}
