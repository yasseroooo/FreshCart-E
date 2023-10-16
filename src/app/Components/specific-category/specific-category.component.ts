import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-specific-category',
  templateUrl: './specific-category.component.html',
  styleUrls: ['./specific-category.component.css']
})
export class SpecificCategoryComponent {
  CategoryId: string = ""
  CategoryDetails: any = ""
  constructor(private _ActivatedRoute: ActivatedRoute, private _CategoryService: CategoryService) {
    _ActivatedRoute.params.subscribe((params) => {
      console.log(params['id'])
      // now i send id in link using routeLink in product div now how to recive in 
      // use _ActivatedRoute.params module and subscribe to get id 
      this.CategoryId = params['id'] || ""

      //function of get product details from api is inside the params to insure the we have product id 
      this._CategoryService.getSpicificCategory(this.CategoryId).subscribe((res) => {
        // after you got id send it to service to return the api link of the product 
        console.log(res)
        this.CategoryDetails = res.data


      })
    })
  }
}
