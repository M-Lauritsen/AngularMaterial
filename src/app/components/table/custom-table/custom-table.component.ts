import { Component, ViewChild, effect } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { UserRoot } from '../../../models/user-model';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [MatTableModule, MatIconModule, CommonModule],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.scss',
})
export class CustomTableComponent {
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
