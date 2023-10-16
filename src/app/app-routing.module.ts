import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistarComponent } from './Components/registar/registar.component';
import { CartComponent } from './Components/cart/cart.component';
import { AllOrdersComponent } from './Components/all-orders/all-orders.component';
import { ProductsComponent } from './Components/products/products.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import ProductDetailsComponent from './Components/product-details/product-details.component';
import { AuthGuard } from './Guards/auth.guard';
import { SpecificCategoryComponent } from './Components/specific-category/specific-category.component';
import { SpecificBrandsComponent } from './Components/specific-brands/specific-brands.component';
import { WishListComponent } from './Components/wish-list/wish-list.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { DonePageComponent } from './Components/done-page/done-page.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistarComponent },

  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'cart', canActivate: [AuthGuard], component: CartComponent },
  { path: 'allorders', canActivate: [AuthGuard], component: AllOrdersComponent },
  { path: 'allorders/allorders', canActivate: [AuthGuard], component: AllOrdersComponent },
  { path: 'products', canActivate: [AuthGuard], component: ProductsComponent },
  { path: 'Categories', canActivate: [AuthGuard], component: CategoriesComponent },
  { path: 'product/:id', canActivate: [AuthGuard], component: ProductDetailsComponent }, // /: => mean its variable
  { path: 'brands', canActivate: [AuthGuard], component: BrandsComponent },
  { path: 'Categories/:id', canActivate: [AuthGuard], component: SpecificCategoryComponent },
  { path: 'wishList', canActivate: [AuthGuard], component: WishListComponent },
  { path: 'checkout/:Cartid', canActivate: [AuthGuard], component: CheckoutComponent },
  { path: 'done-page', canActivate: [AuthGuard], component: DonePageComponent },
  { path: 'Forgetpassword', canActivate: [AuthGuard], component: ForgetPasswordComponent },
  { path: 'Forgetpass', component: ForgetPasswordComponent },

  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash:true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
