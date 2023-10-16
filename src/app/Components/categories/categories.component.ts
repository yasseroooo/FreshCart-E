import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = []
  constructor(private _CategoryService: CategoryService) {


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

  ngOnInit() {
    this._CategoryService.getCategoryName().subscribe({
      next: (res) => {
        console.log(res)
        this.categories = res.data;
      },
      error: (err) => {
        console.log(err)
      }
    }
    )

    // this._CategoryService.getSubCategory().subscribe({
    //   next: (res) => {

    //     console.log(res.data)
        
    //   },
    //   error: (err) => {
    //     console.log(err)
    //   }
    // })
  }
}
