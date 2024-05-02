import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { StandardTableComponent } from '../table/standard-table/standard-table.component';

@Component({
  selector: 'app-expansion-panel',
  standalone: true,
  imports: [MatExpansionModule, StandardTableComponent],
  templateUrl: './expansion-panel.component.html',
  styleUrl: './expansion-panel.component.scss',
})
export class ExpansionPanelComponent {
  panelOpenState = false;
}
