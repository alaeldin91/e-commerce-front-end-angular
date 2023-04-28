import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { AlaeldinShopServiceService } from 'src/app/services/alaeldin-shop-service.service';
import { CartService } from 'src/app/services/cart.service';
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
  constructor(private formBuilder: FormBuilder, private alaeldinService: AlaeldinShopServiceService,private cartService:CartService) { }

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
          city: new FormControl('',[Validators.required,Validators.minLength(2)
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
        city: new FormControl('',[Validators.required
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
    return this.checkoutFormGroup.get('shippingAddress.city');
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
    return this.checkoutFormGroup.get('billingAddress.city');
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
    }
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log(this.checkoutFormGroup.get('shippingAddress').value);
    console.log(this.checkoutFormGroup.get('billingAddress').value);
    console.log(this.checkoutFormGroup.get('creditCard').value);
    console.log(this.checkoutFormGroup.get('billingAddress').value.country.name);
    console.log(this.checkoutFormGroup.get('billingAddress').value.state.name);

    console.log(this.checkoutFormGroup.get('shippingAddress').value.country.name);
    console.log(this.checkoutFormGroup.get('shippingAddress').value.state.name);

    console.log(this.checkoutFormGroup.get('customer').value.email);

  }
}
