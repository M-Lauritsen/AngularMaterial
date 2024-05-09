import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { StandardTableComponent } from '../table/standard-table/standard-table.component';
import { TreeTableComponent } from '../table/tree-table/tree-table.component';

@Component({
  selector: 'app-expansion-panel',
  standalone: true,
  imports: [MatExpansionModule, TreeTableComponent],
  templateUrl: './expansion-panel.component.html',
  styleUrl: './expansion-panel.component.scss',
})
export class ExpansionPanelComponent {
  panelOpenState = false;
}
