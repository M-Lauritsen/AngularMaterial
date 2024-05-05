import { Component, OnInit, Signal, computed, effect } from '@angular/core';
import { StepperComponent } from '../../components/stepper/stepper.component';
import { PresenceService } from '../../services/presence.service';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-stepper-view',
  standalone: true,
  imports: [StepperComponent, CommonModule],
  templateUrl: './stepper-view.component.html',
  styleUrl: './stepper-view.component.scss',
})
export class StepperViewComponent implements OnInit {
  usersOnPage = computed(
    () => this.presenceService.pageUsersMap().get('/stepper') || []
  );
  constructor(
    public presenceService: PresenceService,
    private router: Router
  ) {}

  ngOnInit(): void {}
}
