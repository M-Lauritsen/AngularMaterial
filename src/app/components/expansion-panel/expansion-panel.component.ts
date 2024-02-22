import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-expansion-panel',
  standalone: true,
  imports: [MatExpansionModule, TableComponent],
  templateUrl: './expansion-panel.component.html',
  styleUrl: './expansion-panel.component.scss',
})
export class ExpansionPanelComponent {
  panelOpenState = false;
}
