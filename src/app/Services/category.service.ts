import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _HttpClient:HttpClient) { }


getCategoryName():Observable<any>{
  return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/categories')
}

getSpicificCategory(id:string):Observable<any>{
  return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/categories/'+id)

}
getSubCategory():Observable<any>{
  return this._HttpClient.get('https://route-ecommerce.onrender.com/api/v1/subcategories')

}




}
