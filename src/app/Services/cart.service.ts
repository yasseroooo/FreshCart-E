import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import AuthService from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  CartCount: BehaviorSubject<number> = new BehaviorSubject(0) //جوا السيرفيس بس 

  constructor(private _HttpClient: HttpClient) {
    this.getProductForLoggedUser().subscribe((res) => { // بستخدمها بس عشان اجيب القيمة من الريسبونس واخزنها
      this.CartCount.next(res.numOfCartItems);
    })
  }

  AddproductToCart(productId: string): Observable<any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/cart',
      {
        productId: productId
      })

  }
  //the headers and body take it from api instructor 


  getProductForLoggedUser(): Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart')
  }

  deleteSpcificCartItem(id: number): Observable<any> {
    return this._HttpClient.delete('https://ecommerce.routemisr.com/api/v1/cart/' + id)
  }
  deleteCartItem(): Observable<any> {
    return this._HttpClient.delete('https://ecommerce.routemisr.com/api/v1/cart')
  }

  UodateProductCount(productId: string, count: number): Observable<any> {
    return this._HttpClient.put('https://ecommerce.routemisr.com/api/v1/cart/' + productId, {
      count
    })
  }












}


