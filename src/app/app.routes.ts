import { Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { HomeComponent } from './components/home/home.component';
import { ExpansionPanelComponent } from './components/expansion-panel/expansion-panel.component';
import { SignalReceiverComponent } from './components/signal-receiver/signal-receiver.component';
import { TableTreeComponent } from './components/table-tree/table-tree.component';
import { CardComponent } from './components/card/card.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'table', component: TableComponent },
  { path: 'tree', component: TableTreeComponent },
  { path: 'expansion-panel', component: ExpansionPanelComponent },
  { path: 'card', component: CardComponent },
  { path: 'signal', component: SignalReceiverComponent },
];
