import { Component } from '@angular/core';
import { TableTreeComponent } from '../../components/table-tree/table-tree.component';

@Component({
  selector: 'app-tree-view',
  standalone: true,
  imports: [TableTreeComponent],
  templateUrl: './tree-view.component.html',
  styleUrl: './tree-view.component.scss',
})
export class TreeViewComponent {}
