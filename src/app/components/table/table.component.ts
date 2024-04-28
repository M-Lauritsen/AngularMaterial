import { Component, ViewChild, effect } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { UserRoot } from '../../models/user-model';
import { BottomsheetComponent } from '../bottomsheet/bottomsheet.component';
import { TableToggleColumsComponent } from './table-toggle-colums/table-toggle-colums.component';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  providers: [],
  imports: [
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    CommonModule,
    BottomsheetComponent,
    TableToggleColumsComponent,
  ],
})
export class TableComponent {
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

  addData() {
    this.table.renderRows();
  }

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();
  }
  removeRow(index: number) {
    this.dataSource.splice(index, 1);
    this.table.renderRows();
  }
}
