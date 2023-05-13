import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Router } from '@angular/router';
import { Purches } from 'src/app/common/purches';
import { State } from 'src/app/common/state';
import { AlaeldinShopServiceService } from 'src/app/services/alaeldin-shop-service.service';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutServiceService } from 'src/app/services/checkout-service.service';
import { AlaeldinShopValidator } from 'src/app/validator/alaeldin-shop-validator';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: any;
  totalQuantity: number = 0;
  totalPrice: number = 0.00;
  creditCardYear: number[] = [];
  creditCardMonth: number[] = [];
  counteries: Country[] = [];
  shippingAddressStates:State[] = [];
  billingAddressStates:State[] = [];
  constructor(private formBuilder: FormBuilder,
     private alaeldinService: AlaeldinShopServiceService
    ,private cartService:CartService,private checkoutService:CheckoutServiceService
    ,private route:Router) { }

  ngOnInit(): void {
  this.reviewCartDetails();
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',[Validators.required
                                     ,Validators.minLength(2)
                                     ,AlaeldinShopValidator.notOnlyWhiteSpace]),
        lastName: new FormControl('',[Validators.required
                                    ,AlaeldinShopValidator.notOnlyWhiteSpace]),
        email: new FormControl('',[Validators.required
          ,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
                                     ,AlaeldinShopValidator.notOnlyWhiteSpace])
      }),

      shippingAddress: this.formBuilder.group(
        {
          street: new FormControl('',[Validators.required
                                    ,Validators.minLength(2)
                                    ,AlaeldinShopValidator.notOnlyWhiteSpace]),
          town: new FormControl('',[Validators.required,Validators.minLength(2)
                                 ,AlaeldinShopValidator.notOnlyWhiteSpace]),
          state: new FormControl('',[Validators.required]),
          country: new FormControl('',[Validators.required]),
          zipCode: new FormControl('',[Validators.required
                                   ,Validators.minLength(2)
                                   ,AlaeldinShopValidator.notOnlyWhiteSpace])
        }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('',[Validators.required
                                ,Validators.minLength(2)
                             ,AlaeldinShopValidator.notOnlyWhiteSpace]),
        town: new FormControl('',[Validators.required
                               ,Validators.minLength(2)
                              ,AlaeldinShopValidator.notOnlyWhiteSpace]),
        state: new FormControl('',[Validators.required]),
        country: new FormControl('',[Validators.required]),
        zipCode: new FormControl('',[Validators.required
                                  ,Validators.minLength(2)
                                  ,AlaeldinShopValidator.notOnlyWhiteSpace])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('',[Validators.required]),
        nameOnCard: new FormControl('',[Validators.required,Validators.minLength(2)
                                       ,AlaeldinShopValidator.notOnlyWhiteSpace]),
        cardNumber: new FormControl('',[Validators.required
                                      ,Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('',[Validators.required,Validators.pattern('[0-9]{3}')]),
        expirationMonth: [''],
        expirationYear: ['']
      }),

    });

    const startMonth: number = new Date().getMonth() - 2;
    console.log(`${startMonth}`);
    this.alaeldinService.getCreditCardMonth(startMonth).subscribe(data => {
      console.log("Retrieved credit card months: " + JSON.stringify(data));
      this.creditCardMonth = data;
    });
    this.alaeldinService.getCreditCardYear().subscribe(data => {
      console.log("Retrieved credit card Years: " + JSON.stringify(data));
      this.creditCardYear = data;
    });
    //populate Countries
    this.alaeldinService.getCounteries().subscribe(data=>{
     this.counteries = data;
    });
  }
  reviewCartDetails() {
  //Subscribe to CartService.totalQuantity
  this.cartService.totalQuantity.subscribe(
    totalQuantity=> this.totalQuantity = totalQuantity
  );
  
 //Subscribe to CartService.TotalPrice
   this.cartService.totalPrice.subscribe(
    totalPrice => this.totalPrice = totalPrice
   );
  }
  get firstName(){
    return this.checkoutFormGroup.get('customer.firstName');

  }
  get lastName(){
    return this.checkoutFormGroup.get('customer.lastName');
  }
  get email(){
    return this.checkoutFormGroup.get('customer.email');
  }
  get shippingAddressCountry(){
    return this.checkoutFormGroup.get('shippingAddress.country');
  }
  get shippingAddressState(){
    return this.checkoutFormGroup.get('shippingAddress.state');
  }
  get shippingAddressCity(){
    return this.checkoutFormGroup.get('shippingAddress.town');
  }
  get shippingAddressZipCode(){
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }
  get shippingAddressStreet(){
    return this.checkoutFormGroup.get('shippingAddress.street')
  }
 get billingAddressCountry(){
 return this.checkoutFormGroup.get('billingAddress.country');
  }
  get billingAddressState(){
    return this.checkoutFormGroup.get('billingAddress.state');
  }
  get billingAddressCity(){
    return this.checkoutFormGroup.get('billingAddress.town');
  }
  get billingAddressZipCode(){
    return this.checkoutFormGroup.get('billingAddress.zipCode');
  }
  get billingAddressStreet(){
    return this.checkoutFormGroup.get('billingAddress.street');
  }
  get creditCardType(){
    return this.checkoutFormGroup.get('creditCard.cardType');
  }
  get creditCardNameOnCard(){
    return this.checkoutFormGroup.get('creditCard.nameOnCard');
  }

  get creditCardCardNumber(){
    return this.checkoutFormGroup.get('creditCard.cardNumber');
  }
  get creditCardSecurityCode(){
    return this.checkoutFormGroup.get('creditCard.securityCode');
  }
  getStates(formGroupName:string){
const formGroup = this.checkoutFormGroup.get(formGroupName);
const countryId = formGroup.value.country.id;
this.alaeldinService.getStates(countryId).subscribe(data=>{
  if(formGroupName ==='shippingAddress'){
    console.log(data);
    this.shippingAddressStates = data;
  }
  else{
    this.billingAddressStates = data;
  }
  //select first item By Default
  formGroup.get('state').setValue(data[0]);
})

  }
  copyShippingAddressToBillingAddress(event: any) {

    if (event.target.checked) {
      console.log("ala");
      this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
      this.billingAddressStates = this.shippingAddressState;
    }
    else {
      this.checkoutFormGroup.controls.billingAddress.reset();
      this.billingAddressStates =[];

    }

  }
  
  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get("creditCard");
    const CurrentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);
    let startMonth: number;
    if (CurrentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;

    }
    else {
      startMonth = 1;
    }
    this.alaeldinService.getCreditCardMonth(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonth = data;
      }
    );
  }
  onSubmit() {
    console.log("Submit Handling");
    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
   //setUp Order
   let order = new Order();
     order.totalPrice = this.totalPrice;
     order.totalQuantity = this.totalQuantity;
    console.log(order.totalPrice); 
   //getCartsItem
   const cartItems = this.cartService.cartItems;
    
   //createOrderItems from CartItem
   let orderItems:OrderItem[] = cartItems.map(tempCartItem=> new OrderItem(tempCartItem));
   
  // setUpPurches
  let  purches = new Purches();
  //PopulatePurches
  //populate Purches -customer
  purches.customer = this.checkoutFormGroup.controls['customer'].value;
  console.log(purches.customer);
  purches.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
 
//const state = purches.shippingAddress.state ;


const  shippingAddress= purches.shippingAddress;
 const state =JSON.parse(JSON.stringify(shippingAddress?.state));
 const country =JSON.parse(JSON.stringify(shippingAddress?.country));
 if(purches.shippingAddress !=undefined){
 purches.shippingAddress.state = state.name;
 purches.shippingAddress.country = country.name;
 console.log(purches.shippingAddress.state);
 console.log(purches.shippingAddress.country);

 }
 purches.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;

 const billingAddress = purches.billingAddress;
 const billingState  = JSON.parse(JSON.stringify(billingAddress?.state));
 if(purches.billingAddress !=undefined){
 purches.billingAddress.state = billingState.name;
 purches.billingAddress.country = state.country.name;
 console.log(purches.billingAddress.state);
 console.log(purches.billingAddress.country);
 purches.order = order;
 purches.orderItems = orderItems;
 
 }
 this.checkoutService.placeOrder(purches).subscribe({
next:response=>{
  alert(`your Order has been Recieved.\n Order tracking Number : ${response.orderTrackingNumber} `);
  this.resetCart();
},
error:err=>{
  alert(`there was an error ${err.message}`);
}
 });
//populate populate purches -order and Order Items

  
  
}
  //populate billing Address 
  /**if(purches.shippingAddress !=undefined){
  //populate purches -shippingAddress
  purches.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
  const shippingState:State = JSON.parse(JSON.stringify(purches.shippingAddress?.stateName));
  const shippingAddressCountry:Country = JSON.parse(JSON.stringify(purches.billingAddress?.countryName));
 if(purches.shippingAddress){
  purches.shippingAddress.stateName = shippingState.name;
  purches.shippingAddress.countryName = shippingAddressCountry.name;
  console.log(purches.shippingAddress.countryName);
  console.log(purches.shippingAddress.stateName);**/

 


  //populate purches - billing Address

  /**purches.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
  const billingAddressState:State = JSON.parse(JSON.stringify(purches.billingAddress?.stateName));
  const billingAddressCountry:Country = JSON.parse(JSON.stringify(purches.billingAddress?.stateName));
  if(purches.billingAddress){
  purches.billingAddress.stateName = billingAddressState.name;
  purches.billingAddress.countryName = billingAddressCountry.name;
  
}
  //populate purches -order and Order Items


    purches.order = order;

   purches.orderItem = orderItems;
  


  console.log(purches)

  this.checkoutService.placeOrder(purches).subscribe({
    next:response=>{
      alert(`your Order has been Recieved.\n Order tracking Number : ${response.orderTrackingNumber} `);
      this.resetCart();
    },
  error:err=>{
    alert(`there was an error ${err.message}`);
  }
  });**/
  
  resetCart() {
this.cartService.cartItems =[];
this.cartService.totalPrice.next(0);
this.cartService.totalQuantity.next(0);
this.checkoutFormGroup.reset();
this.route.navigateByUrl("/products")
  }
}
