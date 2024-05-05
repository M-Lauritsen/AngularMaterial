import {
  Component,
  Input,
  OnInit,
  Signal,
  computed,
  effect,
  signal,
} from '@angular/core';
import { PresenceService } from '../../services/presence.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-presence-tracker',
  standalone: true,
  imports: [],
  templateUrl: './presence-tracker.component.html',
  styleUrl: './presence-tracker.component.scss',
})
export class PresenceTrackerComponent {
  @Input() route: string = '';
  usersOnPage = computed(
    () => this.presenceService.pageUsersMap().get(this.route) || []
  );

  constructor(public presenceService: PresenceService) {}
}
