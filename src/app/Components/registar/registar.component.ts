import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import AuthService from 'src/app/Services/auth.service';


@Component({
  selector: 'app-registar',
  templateUrl: './registar.component.html',
  styleUrls: ['./registar.component.css']
})
export class RegistarComponent {
  ErrorMassege:string=""
  isLoading:boolean=false;
  constructor(private _AuthService:AuthService , private _Router:Router) {
    if(localStorage.getItem("userToken") !=null){
      _Router.navigate(["./home"])
    }
  }
  registerForm: FormGroup = new FormGroup({

    name: new FormControl('', [Validators.required, //Validatores ready import function to validate input in diffrent type 
    Validators.minLength(3),
    Validators.maxLength(20),
    Validators.pattern(/^[A-Z][a-zA-Z0-9]+$/)]),
    email: new FormControl('',[Validators.email,Validators.required]),
    password: new FormControl('',[Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/)]),
    rePassword: new FormControl('',[Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/)]),
    phone: new FormControl('',[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    // بتروح تشوف الباك محتاج منك ايه في الريجيستر وتضيفها هنا وتخليها من نوع formControl 

  })

//send request 
  registor(registerForm: FormGroup) {
    this.ErrorMassege=""
    if(registerForm.valid){ 
      this.isLoading=true;
      this._AuthService.register(this.registerForm.value).subscribe({ //go to service and get register func and send object registerForm
        next:(res)=>{
          if (res.message =='success'){}
          this._Router.navigate(['login']) // router to change url from TS to go to login page
        },
        error:(err)=>{
          console.log(err.error.message)
          this.ErrorMassege=err.error.message // this to show in HTML
          this.isLoading=false;  // this to prevnte user from send multiple request 
        }
      })
    }
    else{
      this.registerForm.markAllAsTouched() // if click submit with requred input show all message error
    }
    
  }

// matching password and repassword 
  matching(password:string , rePassword:string): boolean{
    if (password==rePassword){
      console.log(password==rePassword)
      return true;
    }
    else{
      return false;
    }
  }




}


// formGroup => called to all inputs and labels , its form tag
// the email input only called formControl also name , password ...
