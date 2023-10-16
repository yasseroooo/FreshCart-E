import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-carsoul-category',
  templateUrl: './carsoul-category.component.html',
  styleUrls: ['./carsoul-category.component.css']
})
export class CarsoulCategoryComponent implements OnInit {

  images: any[] = []

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
        items: 7
      }
    },
    nav: true,
    autoplay: true
  }
  constructor(private _CategoryService: CategoryService) {


  }




  ngOnInit() {
    this._CategoryService.getCategoryName().subscribe((res) => {
      console.log(res.data)
      this.images = res.data;
    })
  }

  getSpicificCategory(id: string) {
    this._CategoryService.getSpicificCategory(id).subscribe({
      next: (res) => {
        console.log(res)

      },
      error: (err) => {
        console.log(err)
      }
    })
  }


}
