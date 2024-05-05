import { Component } from '@angular/core';
import { StepperComponent } from '../../components/stepper/stepper.component';
import { CommonModule } from '@angular/common';
import { PresenceTrackerComponent } from '../../components/presence-tracker/presence-tracker.component';

@Component({
  selector: 'app-stepper-view',
  standalone: true,
  imports: [StepperComponent, CommonModule, PresenceTrackerComponent],
  templateUrl: './stepper-view.component.html',
  styleUrl: './stepper-view.component.scss',
})
export class StepperViewComponent {}
