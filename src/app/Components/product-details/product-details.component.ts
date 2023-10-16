import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Interfaces/product';
import AuthService from 'src/app/Services/auth.service';
import { ProductsService } from 'src/app/Services/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/Services/cart.service';
import { WishListService } from 'src/app/Services/wish-list.service';
// _ActivatedRoute is used to get id from link
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export default class ProductDetailsComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }
  productId: string = ""
  productDetails!: Product  //>>this most be interface not any >> convert objecte to interface 
  heartClicked:boolean=false
  wishList:any[]=[]
  sucAdd:boolean=false


  constructor(private _ActivatedRoute: ActivatedRoute, private _productsService: ProductsService, private _CartServices: CartService , private _WishListService:WishListService) {
    _ActivatedRoute.params.subscribe((params) => {
      console.log(params['id'])
      // now i send id in link using routeLink in product div now how to recive in 
      // use _ActivatedRoute.params module and subscribe to get id 
      this.productId = params['id'] || ""

      //function of get product details from api is inside the params to insure the we have product id 
      this._productsService.getSpecificProduct(this.productId).subscribe((res) => {
        // after you got id send it to service to return the api link of the product 
        console.log(res)
        this.productDetails = res.data


      })
    })

  }



  addProductToCard(productId:string) {
    this._CartServices.AddproductToCart(productId).subscribe({
      next: (res) => {
        console.log(res.numOfCartItems)
        this._CartServices.CartCount.next(res.numOfCartItems)

      }, error: (err) => {
        console.log(err.error.message)

      }
    },
    )
  }


  AddProductToWishlist(){
    this.heartClicked=true
    this._WishListService.AddProductToWishlist(this.productId).subscribe({
      next: (res) => {
        console.log(res)
        if(res.status== 'success' && !this.sucAdd)
        this.wishList.push(...res.data)
        this.sucAdd=true
        this.heartClicked=true
        console.log(this.wishList)

        

      }, error: (err) => {
        console.log(err)
        this.heartClicked=false

      }
    })

  }







  // بعد ما بعت الاي دي للينك فوق عن طريق الراوتر اكتيف عايز بقى اسحبه من اللينك هستخدم موديول 
  // ActivatedRoute params['id']


  // getdetailproduct(){
  //   this._ProductsService.getSpecificProduct().subscribe((res)=>{
  //     console.log(res)
  //   })
  // }

}
