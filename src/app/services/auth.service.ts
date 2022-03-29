import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@model/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); 

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router
  ) {}

  login(user: User){
    if (user.username !== '' && user.password !== '' ) {
      this.loggedIn.next(true);
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['/list']);
    }
  }

  logout() {                        
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}