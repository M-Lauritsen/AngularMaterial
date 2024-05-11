import { Component } from '@angular/core';
import { BasicChartComponent } from 'src/app/components/charts/basic-chart/basic-chart.component';

@Component({
  selector: 'app-chart-view',
  standalone: true,
  imports: [BasicChartComponent],
  templateUrl: './chart-view.component.html',
  styleUrl: './chart-view.component.scss',
})
export class ChartViewComponent {}
