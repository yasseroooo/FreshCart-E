import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import AuthService from 'src/app/Services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  ErrorMassege:string=""
  isLoading:boolean=false;
  constructor(private _AuthService:AuthService , private _Router:Router) {

    if(localStorage.getItem("userToken") !=null){
      _Router.navigate(["./home"])
    }
  }
  loginForm: FormGroup = new FormGroup({

    email: new FormControl('',[Validators.email,Validators.required]),
    password: new FormControl('',[Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/)]),
    // بتروح تشوف الباك محتاج منك ايه في الريجيستر وتضيفها هنا وتخليها من نوع formControl 

  })

//send request 
  login(loginForm: FormGroup) {
    this.ErrorMassege=""
    if(loginForm.valid){ 
    
      this.isLoading=true;
      this._AuthService.login(this.loginForm.value).subscribe({ //go to service and get register func and send object registerForm to the funcction to login
        next:(res)=>{
          if (res.message =='success'){}
          this._Router.navigate(['home']) // router to change url from TS to go to login page
          localStorage.setItem('userToken',res.token) // store the userToken in local storge its comes from api success
          this._AuthService.isUserLoggedIn.next(true) //at first as user logged in go to isUserLoggedIn and make it true to show all li,s
        },
        error:(err)=>{
          console.log(err.error.message)
          this.ErrorMassege=err.error.message // this to show in HTML
          this.isLoading=false;  // this to prevnte user from send multiple request 
        }
      })
    }
    else{
      this.loginForm.markAllAsTouched() // if click submit with requred input show all message error
    }
    
  }





}

