import { Component, ViewChild, effect } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { UserRoot } from '../../../models/user-model';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-standard-table',
  standalone: true,
  imports: [MatTableModule, MatIconModule, CommonModule],
  templateUrl: './standard-table.component.html',
  styleUrl: './standard-table.component.scss',
})
export class StandardTableComponent {
  displayedColumns: string[] = [
    'username',
    'name',
    'email',
    'phone',
    'picture',
    'actions',
  ];
  dataSource = [] as UserRoot[];

  @ViewChild(MatTable) table!: MatTable<UserRoot>;

  constructor(private userService: UserService) {
    effect(() => {
      this.dataSource = this.userService.getUsers();
    });
    this.table = {} as MatTable<UserRoot>;
  }

  removeRow(index: number) {
    this.dataSource.splice(index, 1);
    this.table.renderRows();
  }
}
