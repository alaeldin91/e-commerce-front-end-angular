import { Inject, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {HttpClientModule} from '@angular/common/http'
import { ProductService } from './services/product.service';
import { Routes ,RouterModule, Router} from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { OKTA_CONFIG, OktaAuthGuard, OktaAuthModule,OktaCallbackComponent,OktaConfig } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import myAppConfig from './conf/my-app-config';
import { MembersPageComponent } from './components/members-page/members-page.component'
const oktaConfig = myAppConfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);
function sendToLoginPage(oktaAuth:OktaAuth,Injector:Injector){
 const router = Injector.get(Router)
 router.navigate(['/login']);
}
const routes: Routes = [
  {path:"members",component:MembersPageComponent,canActivate:[OktaAuthGuard],
data:{onAuthRequired: sendToLoginPage}},
   {path:"login/callback",component:OktaCallbackComponent},
  {path:"login",component:LoginComponent},

  {path:"checkout",component:CheckoutComponent},
  {path:"cart-details",component:CartDetailsComponent}, 
  {path:"product/:id",component:ProductDetailsComponent},
  {path:"searchProducts/:name", component:ProductListComponent},
  { path: "category/:id", component: ProductListComponent},
  { path: 'products', component: ProductListComponent},
  { path: 'category', component: ProductListComponent},
  { path: '', redirectTo :'/products',pathMatch:'full'},
  { path: '**', redirectTo :'/products',pathMatch:'full'},


];
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    MembersPageComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [ProductService,{provide:OKTA_CONFIG,useValue:{oktaAuth}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
