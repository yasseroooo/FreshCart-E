import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CheckOutService } from 'src/app/Services/check-out.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  cartId: string = "";
  selectedOption: any = null; 
  selectedPayment:string=""

  constructor(private _CheckOutService: CheckOutService, private _ActivatedRoute: ActivatedRoute,private _router: Router) {
    _ActivatedRoute.params.subscribe((params) => {
      this.cartId = params['Cartid'];
      console.log(this.cartId);
    });
  }

  shippingAddress: FormGroup = new FormGroup({
    details: new FormControl('',Validators.required),
    phone: new FormControl('',Validators.required),
    city: new FormControl('',Validators.required)
  });

  checkOutCash(shippingAddress: any) {
    console.log(shippingAddress.value);
    console.log(this.cartId);
    this._CheckOutService.checkOutOrderCash(this.cartId, shippingAddress.value).subscribe({
      next:(res)=>{
        console.log(res);
      if(res.status=='success'){
        this.navigateToRoute()
      }
      },error:(err)=> {
        console.log(err);
      },
      
    });
  }


  checkOutVISA(shippingAddress: any) {
    
    this._CheckOutService.checkOutOrderVisa(this.cartId, shippingAddress.value).subscribe({
      next:(res)=>{
        console.log(res.session.url);
      if(res.status=='success'){
        location.href=res.session.url
      }
      },error:(err)=> {
        console.log(err);
      },
      
    });
  }




















  getSelectedRadioValue() {
    console.log('Selected label:', this.selectedOption?.nextElementSibling.textContent);
  }


  navigateToRoute() {
    this._router.navigate(['/done-page']);
  }


  handleRadioChange(event: Event) {
    this.selectedOption = event.target;
    
    this.selectedPayment=this.selectedOption.nextElementSibling.textContent
    console.log(this.selectedPayment);

  }
}