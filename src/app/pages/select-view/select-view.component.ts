import { Component } from '@angular/core';
import { MultiSelectComponent } from '../../components/multi-select/multi-select.component';

@Component({
  selector: 'app-select-view',
  standalone: true,
  imports: [MultiSelectComponent],
  templateUrl: './select-view.component.html',
  styleUrl: './select-view.component.scss',
})
export class SelectViewComponent {}
