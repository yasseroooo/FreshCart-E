import { Component, Input } from '@angular/core';
import AuthService from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';
import { WishListService } from 'src/app/Services/wish-list.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  CartCount: number = 0
  wishList: any[] = []
  sucAdd: boolean = false    // for response
  sucAdd1: boolean = false  // change fast 
  heartClicked: boolean = false

  constructor(private _WishListService: WishListService, private _CartService: CartService, private _AuthService: AuthService, private _toastr: ToastrService) {

  }
  @Input() product: any  // came from homeComponent 


  addproductToCart(productId: string) {
    this._CartService.AddproductToCart(productId).subscribe({
      next: (res) => {
        console.log(res.numOfCartItems)
        this._toastr.success('product added to cart', 'success');
        this._CartService.CartCount.next(res.numOfCartItems)
        // توضيح انت بتبعت العدد اللي جوا الكارت على الكارت كاونت اللي جوا الكارت سيرفيس وهي بتروح تبعتها على الناف بار عشان هي كده كده معمول عليها سابسكرايب ومحطوطه في الكونستراكتور 

      }, error: (err) => {
        console.log(err.error.message)
        if (err.error.message == 'invalid Token. please login again') {
          //if the user has expired login token he cant add to cart 
          // here you most show message to user and log him out to login again 
          this._AuthService.logOut()
        }
      },
    })
  }


  addProductToWishList(productId: string) {
    this.sucAdd1 = true
    this._WishListService.AddProductToWishlist(productId).subscribe({
      next: (res) => {
        console.log(res.numOfCartItems)
        if (res.status == 'success' && !this.sucAdd)
          this.wishList.push(...res.data)
        this.sucAdd = true
        this.heartClicked = true
        console.log(this.wishList)

      }, error: (err) => {
        console.log(err.error.message)
        this.heartClicked = false
      }
    },
    )
  }

}
