import { Component, computed } from '@angular/core';
import { ChipsComponent } from '../../components/chips/chips.component';
import { PresenceService } from '../../services/presence.service';

@Component({
  selector: 'app-chips-view',
  standalone: true,
  imports: [ChipsComponent],
  templateUrl: './chips-view.component.html',
  styleUrl: './chips-view.component.scss',
})
export class ChipsViewComponent {
  usersOnPage = computed(
    () => this.presenceService.pageUsersMap().get('/chips') || []
  );
  constructor(public presenceService: PresenceService) {}
}
