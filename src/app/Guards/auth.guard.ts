import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { Injectable } from '@angular/core';
import AuthService from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router , private _AuthService:AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('userToken') != null) {
      this._AuthService.isUserLoggedIn.next(false)
      const token: any = localStorage.getItem('userToken');
      try {
        const decoded: any = jwt_decode(token || '');
        console.log('Access granted');
        this._AuthService.isUserLoggedIn.next(true)
        return true;
      } catch (error) {
        localStorage.removeItem('userToken');
        this.router.navigate(['/login']);
        console.log('Access denied');
        return false;
      }
    } else {
      console.log('Access denied outside');
      this.router.navigate(['/login']);
      return false;
    }
  }
}