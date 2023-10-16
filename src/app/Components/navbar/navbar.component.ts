import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import AuthService from 'src/app/Services/auth.service';
import { ProductComponent } from '../product/product.component';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  CartCount: number = 0
  navBar_Ask_IsUser_LoggedIn: boolean = false; // variable for navbar
  constructor(private _AuthService: AuthService, private _CartService: CartService , private _Renderer2:Renderer2) {
    _AuthService.isUserLoggedIn.subscribe((res) => { // follow up any change in isUserLoggedIn in _AuthService and when it change 
      this.navBar_Ask_IsUser_LoggedIn = res;  // store it in navbar variable  so navbar can see

    })

    this.updateCartCount()
  }

  updateCartCount(){
    ++this.CartCount;
    this._CartService.CartCount.subscribe((res) => {
      console.log(res)
      this.CartCount = res
    })
  }

  logout() {
    this._AuthService.logOut() // function that from _AuthService when click in navbar.html logout
  }


  @HostListener('window:scroll')
  onscroll(){
    if(scrollY>200){
      this._Renderer2.addClass(this.navElement.nativeElement,'dd')
      this._Renderer2.addClass(this.navElement.nativeElement,'shadow')
    }
    else{
      this._Renderer2.removeClass(this.navElement.nativeElement,'dd')
      this._Renderer2.removeClass(this.navElement.nativeElement,'shadow')
    }
   
    
  }

  @ViewChild('nav') navElement!:ElementRef 

}
