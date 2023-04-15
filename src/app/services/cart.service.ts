import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
   
  constructor() { }
 
  addToCart(theCartItem: CartItem) {
    //check if we Already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;
    if (this.cartItems.length > 0) {
   
      for (let tempCartItem of this.cartItems) {
   
        if (tempCartItem.id === theCartItem.id) {
          existingCartItem = tempCartItem
          break;
        }
      }
    }
    alreadyExistsInCart = (existingCartItem != undefined);
   
    if (alreadyExistsInCart) {
   
      if (existingCartItem?.quantity != undefined){
        existingCartItem.quantity+1;
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
  }
 
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    
    let subTotalPrice: number=0;
    console.log("the main Content");
 
    for (let tempCartItem of this.cartItems) {
       
      tempCartItem.quantity=1;
      if ((tempCartItem.quantity) && (tempCartItem.unitPrice) !=undefined)
        subTotalPrice += tempCartItem.quantity * tempCartItem.unitPrice
        
      console.log(`name: ${tempCartItem.name} quantity = ${tempCartItem.quantity}
   ,unitPrice= ${tempCartItem.unitPrice} totalPrice = ${subTotalPrice} `);
 
    }
    console.log(`total price ${totalPriceValue.toFixed(2)} 
    totalQuantity: ${totalQuantityValue}`);
    console.log('----')
  }
}
