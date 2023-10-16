import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private _HttpClient: HttpClient) { }

  AddProductToWishlist(productId: string): Observable<any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
      productId
    })
  }



  RemoveProductFromWishlist(id: string): Observable<any> {
    return this._HttpClient.delete('https://ecommerce.routemisr.com/api/v1/wishlist/' + id)
  }

  GetLoggedUserWishlist(): Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/wishlist')
  }







}

