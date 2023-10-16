import { Component, OnInit } from '@angular/core';
import { CheckOutService } from 'src/app/Services/check-out.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  allOrders: any[] = []
  images: any[] = []
  userId: string = ""
  constructor(private _CheckOutService: CheckOutService) {

  }

  ngOnInit() {
    this._CheckOutService.GetAll_orders().subscribe((res) => {
      console.log(res)
      this.allOrders = res
    })
  }

}
