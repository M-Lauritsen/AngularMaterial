import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-chips',
  standalone: true,
  imports: [MatChipsModule],
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.scss',
})
export class ChipsComponent {
  availableChips: ChipsColor[] = [
    { name: 'none', color: undefined },
    { name: 'accent', color: 'accent' },
    { name: 'primary', color: 'primary' },
    { name: 'warn', color: 'warn' },
  ];

  schemaList: SchemaList[] = [
    { name: 'Fast', url: 'Fast/', color: 'warn' },
    { name: 'Slow', url: 'Slow/', color: 'primary' },
    { name: 'Meh', url: 'Meh/', color: 'accent' },
  ];

  LogChip(name: any) {
    console.log(name);
  }
}
export interface ChipsColor {
  name: string;
  color: ThemePalette;
}

export interface SchemaList {
  name: string;
  url: string;
  color: ThemePalette;
}
