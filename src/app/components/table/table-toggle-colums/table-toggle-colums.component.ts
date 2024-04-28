import { Component, Input, OnInit, ViewChild, effect } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { UserRoot } from '../../../models/user-model';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-table-toggle-colums',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    CommonModule,
    MatCheckboxModule,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './table-toggle-colums.component.html',
  styleUrl: './table-toggle-colums.component.scss',
})
export class TableToggleColumsComponent implements OnInit {
  allColumns = ['username', 'name', 'email', 'phone', 'picture', 'actions'];
  displayedColumns: string[] = [];
  dataSource = [] as UserRoot[];

  @ViewChild(MatTable) table!: MatTable<UserRoot>;

  constructor(private userService: UserService) {
    effect(() => {
      this.dataSource = this.userService.getUsers();
    });
    this.table = {} as MatTable<UserRoot>;
  }

  ngOnInit() {
    // Load columns from localStorage or default to showing all columns
    const columns = localStorage.getItem('displayedColumns');
    const storedColumns = JSON.parse(columns!);
    if (storedColumns) {
      this.displayedColumns = storedColumns;
    } else {
      this.displayedColumns = this.allColumns;
      localStorage.setItem(
        'displayedColumns',
        JSON.stringify(this.displayedColumns)
      );
    }
  }

  toggleColumn(column: string): void {
    console.log(column);
    const index = this.displayedColumns.indexOf(column);
    if (index >= 0) {
      this.displayedColumns.splice(index, 1);
    } else {
      this.displayedColumns.push(column);
    }
    localStorage.setItem(
      'displayedColumns',
      JSON.stringify(this.displayedColumns)
    );
  }

  removeRow(index: number) {
    this.dataSource.splice(index, 1);
    this.table.renderRows();
  }

  getColumnDisplayName(column: string): string {
    const names: ColumnNames = {
      username: 'Username',
      name: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      picture: 'Picture',
      actions: 'Actions',
    };
    return names[column] || column; // Now TypeScript knows how to handle this
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    moveItemInArray(
      this.displayedColumns,
      event.previousIndex,
      event.currentIndex
    );
    localStorage.setItem(
      'displayedColumns',
      JSON.stringify(this.displayedColumns)
    );
  }
}
interface ColumnNames {
  [key: string]: string; // This is the index signature
  username: string;
  name: string;
  email: string;
  phone: string;
  picture: string;
  actions: string;
}
