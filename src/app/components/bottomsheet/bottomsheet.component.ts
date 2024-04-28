import { Component } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { BottomsheetViewComponent } from './bottomsheet-view/bottomsheet-view.component';
import { UserService } from '../../services/user.service';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-bottomsheet',
  standalone: true,
  imports: [MatButtonModule, MatBottomSheetModule, MatBadgeModule],
  templateUrl: './bottomsheet.component.html',
  styleUrl: './bottomsheet.component.scss',
})
export class BottomsheetComponent {
  constructor(
    private _bottomSheet: MatBottomSheet,
    public userService: UserService
  ) {}

  openBottomSheet(): void {
    this._bottomSheet.open(BottomsheetViewComponent);
  }
}
