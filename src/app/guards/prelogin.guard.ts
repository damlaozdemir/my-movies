import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PreloginGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(): boolean | Promise<boolean> | Observable<boolean> {
        const user = localStorage.getItem('user');
        if (user !== null && user !== undefined) {
            this.router.navigate(['/list']);
            return false;
        }
        return true;
    }
}
