import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-card-view',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.scss',
})
export class CardViewComponent {}
