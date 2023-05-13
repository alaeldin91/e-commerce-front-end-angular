import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
   storage:Storage = localStorage;
   persistCartItems(){
    this.storage.setItem('cartItems',JSON.stringify(this.cartItems));
   }
  constructor() { 
  let  data = JSON.parse(this.storage.getItem('cartItems') as any);
  if(data != null){
  this.cartItems = data;
  this.computeCartTotals();
  }

  }
  


  addToCart(theCartItem: CartItem) {
    //check if we Already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;
    if (this.cartItems.length > 0) {
   
      for (let tempCartItem of this.cartItems) {
   
        if (tempCartItem.productId === theCartItem.productId) {
          existingCartItem = tempCartItem
          break;
        }
      }
    }
    alreadyExistsInCart = (existingCartItem != undefined);
   
    if (alreadyExistsInCart) {
   
      if (existingCartItem?.quantity != undefined){
        existingCartItem.quantity++;
    }
  
}
    else {
      this.cartItems.push(theCartItem);
    }
    this.computeCartTotals();
}
  //find the item in the cart based on item id
  //check if we found it

  computeCartTotals() {
   let  totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
 
    for (let tempCartItem of this.cartItems) {
 
      if ((tempCartItem.quantity) && (tempCartItem.unitPrice) != undefined) {
        totalPriceValue += tempCartItem.quantity * tempCartItem.unitPrice;
        totalQuantityValue += tempCartItem.quantity;
      }
 }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    console.log(this.totalQuantity);
    this.logCartData(totalPriceValue,totalQuantityValue);
    this.persistCartItems();
  }
 
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    
    let subTotalPrice: number=0;
    console.log("the main Content");
 
    for (let tempCartItem of this.cartItems) {
       
      tempCartItem.quantity=1;
      if ((tempCartItem.quantity) && (tempCartItem.unitPrice) !=undefined)
        subTotalPrice += tempCartItem.quantity * tempCartItem.unitPrice
        
      console.log(`name: ${tempCartItem.productName} quantity = ${tempCartItem.quantity}
   ,unitPrice= ${tempCartItem.unitPrice} totalPrice = ${subTotalPrice} `);
 
    }
    console.log(`total price ${totalPriceValue.toFixed(2)} 
    totalQuantity: ${totalQuantityValue}`);
    console.log('----')
  }
  decrementService(theCartItem:CartItem){
    let quantity : number =0;
    quantity--;
    if(quantity == 0){
      this.remove(theCartItem);
    }
    else{
      this.computeCartTotals();
    }

    
  }
  remove(theCartItem:CartItem){
   // get index of item in the array
   const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.productId === theCartItem.productId );
// if found, remove the item from the array at the given index
   if (itemIndex > -1) {
     this.cartItems.splice(itemIndex, 1);

     this.computeCartTotals();
   }    
  }
}
