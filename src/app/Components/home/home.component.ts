import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { ProductsService } from 'src/app/Services/products.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
products:any[]=[]
searchTearm:string=""
  constructor(private _ProductsService:ProductsService , private _CartService:CartService){}

  ngOnInit(){
    this._ProductsService.getProducts().subscribe((res)=>{
      console.log(res)
      this.products=res.data
      
    })
  }




}
