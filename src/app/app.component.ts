import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  EventType,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { UserService } from './services/user.service';
import { BottomsheetComponent } from './components/bottomsheet/bottomsheet.component';
import { MatBadgeModule } from '@angular/material/badge';
import {
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
  MsalService,
  MsalBroadcastService,
  MsalModule,
} from '@azure/msal-angular';
import {
  EventMessage,
  InteractionStatus,
  RedirectRequest,
} from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';
import { WeatherService } from './services/weather.service';
import { PressenceService } from './services/pressence.service';
import { environment } from './environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    DatepickerComponent,
    BottomsheetComponent,
    MatBadgeModule,
    MsalModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Angular Material';
  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    public userService: UserService,
    private weatherService: WeatherService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private pressence: PressenceService
  ) {
    this.userService.fetchUsers();
  }

  ngOnInit(): void {
    this.authService.handleRedirectObservable().subscribe();

    this.setLoginDisplay();

    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      });
  }

  checkAndSetActiveAccount() {
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    let activeAccount = this.authService.instance.getActiveAccount();

    if (
      !activeAccount &&
      this.authService.instance.getAllAccounts().length > 0
    ) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }

    var request = {
      scopes: environment.WeatherApiConfig.scopes,
    };
    this.authService.acquireTokenSilent(request).subscribe((response) => {
      console.log(response);
      this.pressence.createdHubConnection(response);
    });

    const user = this.pressence.onlineUsers$;
    console.log('Hub user', user);
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  login() {
    this.authService.loginRedirect();
  }
  loginRedirect() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({
        ...this.msalGuardConfig.authRequest,
      } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }
  logout() {
    this.authService.logoutRedirect();
  }
  getWeather() {
    this.weatherService.getWeather().subscribe((weather) => {
      console.log(weather);
    });
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
