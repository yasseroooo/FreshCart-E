import { Component } from '@angular/core';
import AuthService from './Services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ecommerce';

  constructor(private _AuthService: AuthService) {
    if (localStorage.getItem('userToken') != null) {
      _AuthService.isUserLoggedIn.next(true)
    }
    // حطيت الشرط ده هنا عشان ده اول حجة بتشتغل وبكده لو هو مسجل هتأكد ان الناف بار تشوف اخر تحديث 
  }
}
