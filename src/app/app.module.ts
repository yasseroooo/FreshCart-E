import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProductsComponent } from './Components/products/products.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { RegistarComponent } from './Components/registar/registar.component';
import { LoginComponent } from './Components/login/login.component';
import { AllOrdersComponent } from './Components/all-orders/all-orders.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { FooterComponent } from './Components/footer/footer.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { ProductComponent } from './Components/product/product.component';
import ProductDetailsComponent from './Components/product-details/product-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CarouselHomeComponent } from './Components/carousel-home/carousel-home.component';
import { CarsoulCategoryComponent } from './Components/carsoul-category/carsoul-category.component';
import { AuthGuard } from './Guards/auth.guard';
import { BuyPipe } from './Pipes/buy.pipe';
import { SeeMorePipe } from './Pipes/see-more.pipe';
import { SearchPipe } from './Pipes/search.pipe';
import { ToastrModule } from 'ngx-toastr';
import { HeadersInterceptor } from './Interceptors/headers.interceptor';
import { SpecificCategoryComponent } from './Components/specific-category/specific-category.component';
import { SpecificBrandsComponent } from './Components/specific-brands/specific-brands.component';
import { WishListComponent } from './Components/wish-list/wish-list.component';
import { DonePageComponent } from './Components/done-page/done-page.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingInterceptor } from './Interceptors/loading.interceptor';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { NgxPaginationModule } from 'ngx-pagination';


export const routes: Routes = []
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    CategoriesComponent,
    BrandsComponent,
    NavbarComponent,
    RegistarComponent,
    LoginComponent,
    AllOrdersComponent,
    CheckoutComponent,
    FooterComponent,
    NotfoundComponent,
    ProductComponent,
    ProductDetailsComponent,
    CarouselHomeComponent,
    CarsoulCategoryComponent,
    BuyPipe,
    SeeMorePipe,
    SearchPipe,
    SpecificCategoryComponent,
    SpecificBrandsComponent,
    WishListComponent,
    DonePageComponent,
    ForgetPasswordComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,  // give you more option to make validation
    RouterModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    NgxPaginationModule,

  ],
  providers: [AuthGuard, {
    provide: HTTP_INTERCEPTORS,  // subscribe all requestes sented and add headers:token to it 
    useClass: HeadersInterceptor,
    multi: true,
  }, {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
