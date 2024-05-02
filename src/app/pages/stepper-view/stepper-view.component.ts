import { Component } from '@angular/core';
import { StepperComponent } from '../../components/stepper/stepper.component';

@Component({
  selector: 'app-stepper-view',
  standalone: true,
  imports: [StepperComponent],
  templateUrl: './stepper-view.component.html',
  styleUrl: './stepper-view.component.scss',
})
export class StepperViewComponent {}
