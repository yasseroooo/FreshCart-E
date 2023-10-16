import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export default class AuthService {
    isUserLoggedIn:BehaviorSubject<boolean>=new BehaviorSubject(false)
    //the BehaviorSubject is like Observable its subscribe but for proprty only not function
   // also if i use  without BehaviorSubject the navbar disabled li,s wont sense the change 

    constructor(private _httpClient: HttpClient , private _Router:Router) {}


    register(registerForm: any): Observable < any > {
        return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', registerForm)
    };


    login(loginForm: any): Observable < any > {
        return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', loginForm)
    };


    logOut(){
        localStorage.removeItem('userToken'); // for logout clear token
        this.isUserLoggedIn.next(false) // to show and not showing navbar li,s
        this._Router.navigate(['login']) //go to login page 
        console.log("logout")
    }
}
