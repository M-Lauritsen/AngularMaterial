import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MsalGuard } from '@azure/msal-angular';
import { ProfileComponent } from './components/profile/profile.component';
import { CardViewComponent } from './pages/card-view/card-view.component';
import { ChipsViewComponent } from './pages/chips-view/chips-view.component';
import { ExpansionViewComponent } from './pages/expansion-view/expansion-view.component';
import { SelectViewComponent } from './pages/select-view/select-view.component';
import { SignalViewComponent } from './pages/signal-view/signal-view.component';
import { StepperViewComponent } from './pages/stepper-view/stepper-view.component';
import { TableViewComponent } from './pages/table-view/table-view.component';
import { TreeViewComponent } from './pages/tree-view/tree-view.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'table', component: TableViewComponent },
  { path: 'tree', component: TreeViewComponent, canActivate: [MsalGuard] },
  { path: 'expansion-panel', component: ExpansionViewComponent },
  { path: 'card', component: CardViewComponent },
  { path: 'signal', component: SignalViewComponent },
  { path: 'chips', component: ChipsViewComponent },
  { path: 'stepper', component: StepperViewComponent },
  { path: 'select', component: SelectViewComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [MsalGuard] },
];
