import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  constructor(private _HttpClient:HttpClient) { }

  ForgetPassword(ForgetPassword:any):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',ForgetPassword)
  }

  ResetCode(VerifyResetCode:any):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',VerifyResetCode)
  }

  RePassword(ResetPassword:any):Observable<any>{
    return this._HttpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',ResetPassword)
  }
}
