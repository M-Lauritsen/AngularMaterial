import { Component, ViewChild, effect } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { UserRoot } from '../../models/user-model';
import { BottomsheetComponent } from '../bottomsheet/bottomsheet.component';
import { TableToggleColumsComponent } from './table-toggle-colums/table-toggle-colums.component';
import { StandardTableComponent } from './standard-table/standard-table.component';
import { CustomTableComponent } from './custom-table/custom-table.component';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  providers: [],
  imports: [
    MatButtonModule,
    BottomsheetComponent,
    TableToggleColumsComponent,
    StandardTableComponent,
    CustomTableComponent,
  ],
})
export class TableComponent {}
