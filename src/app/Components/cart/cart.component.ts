import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  productsInCarts: any[] = []
  totalPrice: number = 0
  ErrorMessage: string = ""
  isLoading: boolean = false;
  updateProductTimeOut: any
  cartId: string = ""

  constructor(private _CartService: CartService, private _ToastrService: ToastrService) {

  }

  ngOnInit() {
    this.getAndShowProductForLoggedUser()
  }


  getAndShowProductForLoggedUser() {
    this.isLoading = true
    this._CartService.getProductForLoggedUser().subscribe({
      next: (res) => {
        console.log(res)
        this.isLoading = false
        this.productsInCarts = res.data.products
        this.totalPrice = res.data.totalCartPrice
        console.log(this.productsInCarts)
        this.cartId=res.data._id
      },
      error: (error) => {
        this.isLoading = false
        console.log(error)
      }
    })
  }

  deleteSpicificProducte(id: number, index: number) {
    this.productsInCarts.splice(index, 1);
    this._CartService.deleteSpcificCartItem(id).subscribe((res) => {
      console.log(res)
      this.productsInCarts = res.data.products
      this.totalPrice = res.data.totalCartPrice
      this._CartService.CartCount.next(res.numOfCartItems)

    })
  }
  deleteallCart() {
    this.productsInCarts = []
    this._CartService.deleteCartItem().subscribe({
      next: (res) => {
        console.log(res)
        if (res.message = 'succes') {
          this.productsInCarts = []
          this.totalPrice = 0
          this._CartService.CartCount.next(0)
        }

      },
      error: (err) => {
        if (err.error.message.include('No cart exist for this user')) {
          this.ErrorMessage = "No cart exist for this user"

        }

      }



    })
  }

  UpdateProductCount(productId: string, count: number, index: number) {
    this.productsInCarts[index].count = count
    this.totalPrice += this.productsInCarts[index].price
    clearTimeout(this.updateProductTimeOut)
    this.updateProductTimeOut = setTimeout(() => {
      this._CartService.UodateProductCount(productId, count).subscribe({
        next: (res) => {
          console.log(res)
          this.productsInCarts = res.data.products
          this.totalPrice = res.data.totalCartPrice
        },
        error: (err) => {
          console.log(err)
          this.getAndShowProductForLoggedUser()
          this._ToastrService.error('somthing went wrong', 'ooops');
        }
      })
    }, 500);

  }

}
