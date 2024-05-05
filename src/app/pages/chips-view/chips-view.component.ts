import { Component } from '@angular/core';
import { ChipsComponent } from '../../components/chips/chips.component';
import { PresenceTrackerComponent } from '../../components/presence-tracker/presence-tracker.component';

@Component({
  selector: 'app-chips-view',
  standalone: true,
  imports: [ChipsComponent, PresenceTrackerComponent],
  templateUrl: './chips-view.component.html',
  styleUrl: './chips-view.component.scss',
})
export class ChipsViewComponent {}
