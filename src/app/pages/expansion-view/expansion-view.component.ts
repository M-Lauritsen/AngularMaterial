import { Component } from '@angular/core';
import { ExpansionPanelComponent } from '../../components/expansion-panel/expansion-panel.component';

@Component({
  selector: 'app-expansion-view',
  standalone: true,
  imports: [ExpansionPanelComponent],
  templateUrl: './expansion-view.component.html',
  styleUrl: './expansion-view.component.scss',
})
export class ExpansionViewComponent {}
