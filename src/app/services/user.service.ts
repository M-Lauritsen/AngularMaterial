import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  // Get all users from randomuser.me
  getUsers() {
    return fetch('https://randomuser.me/api/?results=10')
      .then((res) => res.json())
      .then((res) => res.results);
  }
}
