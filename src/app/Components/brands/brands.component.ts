import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { BrandServiceService } from 'src/app/Services/brand-service.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  brandes: any[] = []
  constructor(private _BrandServiceService: BrandServiceService) {

  }

  getSpicificCategory(id: string) {
    this._BrandServiceService.getSpicificBrands(id).subscribe({
      next: (res) => {
        console.log(res)

      },
      error: (err) => {
        console.log(err)
      }
    })
  }


  ngOnInit() {
    this._BrandServiceService.getBrands().subscribe({
      next: (res) => {
        console.log(res.data)
        this.brandes = res.data
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}

