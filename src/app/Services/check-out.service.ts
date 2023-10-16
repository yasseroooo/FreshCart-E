import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {

  constructor(private _HttpClient: HttpClient) { }


  checkOutOrderCash(CartId: string, shippingAddress: any): Observable<any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/orders/' + CartId, {
      shippingAddress
    })
  }

  checkOutOrderVisa(CartId: string, shippingAddress: any): Observable<any> {
    const url = 'https://ecommerce.routemisr.com/api/v1/orders/checkout-session/' + CartId;
    const queryParams = encodeURIComponent('https://yasseroooo.github.io/FreshCartE');
  
    // Replace 'http' with 'https' in the encoded URL
    const encodedUrlWithHttps = queryParams.replace('http', 'https');
  
    return this._HttpClient.post(`${url}?url=${queryParams}`, {
      shippingAddress
    });
  }


  GetAll_orders(): Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/orders/user/651ff9a80afd984553295bb1')
  }












}
