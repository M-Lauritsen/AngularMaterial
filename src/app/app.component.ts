import { Component, OnInit, effect } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { UserService } from './services/user.service';
import { BottomsheetComponent } from './components/bottomsheet/bottomsheet.component';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    DatepickerComponent,
    BottomsheetComponent,
    MatBadgeModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Angular Material';
  tableBadge!: number;
  constructor(public userService: UserService) {
    effect(() => {
      this.tableBadge = this.userService.getUsers().length;
    });
    this.userService.fetchUsers();
  }
}
