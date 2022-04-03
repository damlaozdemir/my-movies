import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@model/user.model';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  login(user: User) {
    if (user.username !== '' && user.password !== '') {
      this.userService.addUser(user)
      localStorage.setItem('user', JSON.stringify(user));
      this.loggedIn.next(true);
      this.router.navigate(['/list']);
    }
  }

  logout() {  //Bu metod tüm localstorageı temizlemeli fakat film listesi sıfırlanmasın diye movie yi sildirtmedim.       
    this.loggedIn.next(false);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}