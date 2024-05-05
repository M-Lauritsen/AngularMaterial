import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, take } from 'rxjs';
import { environment } from '../environment';
import { AuthenticationResult } from '@azure/msal-browser';

@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  url = environment.SignalR.uri;
  private hubConnection!: HubConnection;
  private onlineUsersSource: WritableSignal<string[]> = signal([]);
  onlineUsers: Signal<string[]> = this.onlineUsersSource;

  private usersOnPageSource: WritableSignal<string[]> = signal([]); // Using signal
  usersOnPage: Signal<string[]> = this.usersOnPageSource; // Exposing it as signal

  private routerInitialized = false; // Flag to check router initialization

  constructor(private router: Router) {}

  createdHubConnection(msalToken: AuthenticationResult) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.url + '/presence', {
        accessTokenFactory: () => msalToken.accessToken,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection Started');
        this.initializeRouterSubscription();
      })
      .catch((error) => console.log(error));

    // When a user is online
    this.hubConnection.on('UserIsOnline', (username: string) => {
      this.onlineUsersSource.update((currentUsers) => [
        ...currentUsers,
        username,
      ]);
    });

    // When a user is offline
    this.hubConnection.on('UserIsOffline', (username: string) => {
      this.onlineUsersSource.update((currentUsers) =>
        currentUsers.filter((x) => x !== username)
      );
    });

    // Set the list of currently online users
    this.hubConnection.on('GetOnlineUsers', (usernames: string[]) => {
      this.onlineUsersSource.set(usernames);
    });

    // Listen for UsersOnPage event
    this.hubConnection.on('UsersOnPage', (usernames: string[]) => {
      this.usersOnPageSource.set(usernames); // Update the users on the current page
    });
  }

  stopHubConnection() {
    this.hubConnection.stop().catch((error) => console.log(error));
  }

  updateUserRoute(route: string) {
    // Invoke UpdateUserRoute on the server-side SignalR hub
    this.hubConnection
      .invoke('UpdateUserRoute', route)
      .catch((err) => console.error('Error invoking UpdateUserRoute:', err));
  }

  private initializeRouterSubscription() {
    if (!this.routerInitialized) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          console.log(event.urlAfterRedirects);
          this.updateUserRoute(event.urlAfterRedirects);
        }
      });
      this.routerInitialized = true; // Ensure initialization happens only once
    }
  }
}
