import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, take } from 'rxjs';
import { environment } from '../environment';
import { AuthenticationResult } from '@azure/msal-browser';

@Injectable({
  providedIn: 'root',
})
export class PressenceService {
  url = environment.SignalR.uri;
  private hubConnection!: HubConnection;
  private onlineUsersSource: WritableSignal<string[]> = signal([]);
  onlineUsers: Signal<string[]> = this.onlineUsersSource;

  constructor(private router: Router) {}

  createdHubConnection(msalToken: AuthenticationResult) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.url + '/pressence', {
        accessTokenFactory: () => msalToken.accessToken,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection Started'))
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
  }

  stopHubConnection() {
    this.hubConnection.stop().catch((error) => console.log(error));
  }
}
