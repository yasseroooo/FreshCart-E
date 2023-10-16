import { Component, OnInit } from '@angular/core';
import { WishListService } from 'src/app/Services/wish-list.service';
import { ProductComponent } from '../product/product.component';
import { CartService } from 'src/app/Services/cart.service';
import { Toast } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  WishListAray: any[] = []
isLoading:boolean=false
  constructor(private _WishListService: WishListService, private _CartService: CartService, private _toastr:ToastrService) {

  }

  ngOnInit() {
    this.isLoading=true
    this._WishListService.GetLoggedUserWishlist().subscribe({

      next: (res) => {
        console.log(res)
        this.WishListAray = res.data;
        this.isLoading = false

      }, error: (err) => {
        console.log(err.error.message)

      }
    })
  }

  removeProductFromWishList(id: string, index: number) {
    this.WishListAray.splice(index, 1);
    this._WishListService.RemoveProductFromWishlist(id).subscribe({
      next: (res) => {
        console.log(res)
        this.ngOnInit()


      }, error: (err) => {
        console.log(err)

      }
    })
  }

  addProductToCart(productId: string) {
    this._CartService.AddproductToCart(productId).subscribe({
      next: (res) => {
        console.log(res)
        this._toastr.success('product added to cart', 'success');
        this._CartService.CartCount.next(res.numOfCartItems)
        


      }, error: (err) => {
        console.log(err)

      }
    })
  }



}
