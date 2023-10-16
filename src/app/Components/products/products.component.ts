import { Component } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  p: number = 1;
  products: any[] = []
  pageSize: number = 0
  total: number = 0

  constructor(private _ProductsService: ProductsService, private _CartService: CartService) { }

  ngOnInit() {
    this._ProductsService.getProducts().subscribe((res) => {
      console.log(res.data)
      this.products = res.data
      this.pageSize = res.metadata.limit
      this.p = res.metadata.currentPage
      this.total = res.results

    })
  }


  pageChanged(event: any) {
    this._ProductsService.getProducts(event).subscribe((res) => {
      console.log(res.data)
      this.products = res.data
      this.pageSize = res.metadata.limit
      this.p = res.metadata.currentPage
      this.total = res.results

    })
  }
}
