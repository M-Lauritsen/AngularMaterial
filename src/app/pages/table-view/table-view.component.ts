import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BottomsheetComponent } from '../../components/bottomsheet/bottomsheet.component';
import { CustomTableComponent } from '../../components/table/custom-table/custom-table.component';
import { StandardTableComponent } from '../../components/table/standard-table/standard-table.component';
import { TableToggleColumsComponent } from '../../components/table/table-toggle-colums/table-toggle-colums.component';
import { TreeTableComponent } from '../../components/table/tree-table/tree-table.component';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [
    MatButtonModule,
    BottomsheetComponent,
    TableToggleColumsComponent,
    StandardTableComponent,
    CustomTableComponent,
    TreeTableComponent,
  ],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.scss',
})
export class TableViewComponent {}
