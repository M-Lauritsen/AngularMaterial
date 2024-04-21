import { Injectable, signal } from '@angular/core';
import { UserRoot } from '../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private fecthedUsers = signal<UserRoot[]>([]);
  constructor() {}

  async fetchUsers() {
    try {
      const response = await fetch('https://randomuser.me/api/?results=10');
      const data = await response.json();
      const users = data.results as UserRoot[];
      this.fecthedUsers.update(() => users);
      console.log('Fetched updated:', this.getUsers());
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  getUsers() {
    return this.fecthedUsers();
  }
}
