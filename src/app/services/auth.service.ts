import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@model/user.model';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class AuthService {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  login(user: User) {
    if (user.username !== '' && user.password !== '') {
      this.userService.addUser(user)
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['/list']);
    }
  }

  logout() {  
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}