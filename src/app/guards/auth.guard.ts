import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(): boolean | Promise<boolean> | Observable<boolean> {
        const user = localStorage.getItem('user');
        if (user === null || user === undefined) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}
