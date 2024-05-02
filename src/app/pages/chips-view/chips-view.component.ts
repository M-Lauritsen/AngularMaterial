import { Component } from '@angular/core';
import { ChipsComponent } from '../../components/chips/chips.component';

@Component({
  selector: 'app-chips-view',
  standalone: true,
  imports: [ChipsComponent],
  templateUrl: './chips-view.component.html',
  styleUrl: './chips-view.component.scss',
})
export class ChipsViewComponent {}
