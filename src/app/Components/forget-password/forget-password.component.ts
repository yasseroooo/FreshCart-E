import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { error } from 'jquery';
import { ForgetPasswordService } from 'src/app/Services/forget-password.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  stage1: boolean = true
  stage2: boolean = false
  stage3: boolean = false
  Useremail: string = ""
  userMessage: string = ""


  constructor(private _ForgetPasswordService: ForgetPasswordService, private _Router: Router) {

  }


  ForgetPassword: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required])

  })

  VerifyResetCode: FormGroup = new FormGroup({
    resetCode: new FormControl('', [Validators.required])
  })


  ResetPassword: FormGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.required])

  })


  ForgetPasswordFunc() {
    let email = this.ForgetPassword.value
    console.log(email)
    this.Useremail = email.email
    this._ForgetPasswordService.ForgetPassword(email).subscribe({
      next: (res) => {
        console.log(res.message)
        this.userMessage = res.message
        this.stage1 = false
        this.stage2 = true

      },
      error: (err) => {
        console.log(err)
        this.userMessage = err.error.message
      }
    }
    )
  }
  ResetCode() {
    let code = this.VerifyResetCode.value
    this._ForgetPasswordService.ResetCode(code).subscribe({
      next: (res) => {
        console.log(res.message)
        this.userMessage = res.message
        this.stage2 = false
        this.stage3 = true

      },
      error: (err) => {
        console.log(err)
        this.userMessage = err.error.message
      }
    })
  }

  RePassowrd() {
    let ReForm = this.ResetPassword.value
    ReForm.email = this.Useremail
    this._ForgetPasswordService.RePassword(ReForm).subscribe({
      next: (res) => {
        console.log(res.message)
        this.userMessage = res.message
        if (res.token) {
          localStorage.setItem('userToken', res.token)
          this._Router.navigate(['/home'])
        }


      },
      error: (err) => {
        console.log(err)
        this.userMessage = err.error.message
      }
    })
  }



}
