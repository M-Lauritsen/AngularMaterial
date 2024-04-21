import { Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { HomeComponent } from './components/home/home.component';
import { ExpansionPanelComponent } from './components/expansion-panel/expansion-panel.component';
import { SignalReceiverComponent } from './components/signal-receiver/signal-receiver.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'table', component: TableComponent },
  { path: 'expansion-panel', component: ExpansionPanelComponent },
  { path: 'signal', component: SignalReceiverComponent },
];
