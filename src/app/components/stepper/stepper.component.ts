import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [MatStepperModule, MatButtonModule, CardComponent],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
})
export class StepperComponent {}
