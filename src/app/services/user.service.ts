import { Injectable } from '@angular/core';
import { User } from '@model/user.model';
import { Observable, of } from 'rxjs';

@Injectable()
export class UserService {
  constructor() {
  }

  addUser(user): void {
    const allUsers: User[] = JSON.parse(localStorage.getItem('users')) || [];
    if (allUsers.filter(u => u.username === user.username).length === 0) {
        user.setMovies([]);
        allUsers.push(user);
        localStorage.setItem('users', JSON.stringify(allUsers)); // fake db
    }
  }

  deleteUser(): Observable<boolean> {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const allUsers: User[] = JSON.parse(localStorage.getItem('users')) || [];
    const newUsers = allUsers.filter(u => u.username !== user.username);
    localStorage.setItem('users', JSON.stringify(newUsers));
    return of(true);
  }
}