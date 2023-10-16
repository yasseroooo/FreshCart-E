import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandServiceService } from 'src/app/Services/brand-service.service';

@Component({
  selector: 'app-specific-brands',
  templateUrl: './specific-brands.component.html',
  styleUrls: ['./specific-brands.component.css']
})
export class SpecificBrandsComponent {
  brandId: string = ""
 brandDetails: any = ""
  constructor(private _ActivatedRoute: ActivatedRoute, private _BrandServiceService: BrandServiceService) {
    _ActivatedRoute.params.subscribe((params) => {
      this.brandId = params['id'] || "" 
      this._BrandServiceService.getSpicificBrands(this.brandId).subscribe((res) => {
        console.log(res)
        this.brandDetails = res.data


      })
    })
  }
}
