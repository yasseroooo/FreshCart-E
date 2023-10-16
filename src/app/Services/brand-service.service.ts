import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandServiceService {

  constructor(private _HttpClient:HttpClient) { }

  getBrands():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/brands')
  }
  
  getSpicificBrands(id:string):Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/brands/'+id)
  
  }
}
