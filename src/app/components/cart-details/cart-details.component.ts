import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0.00;
  totalQuantity: number = 0;
  ngOnInit(): void {
    this.listCartDetails();
  }
  constructor(private cartSevice: CartService) { }
  listCartDetails() {
    //getHandle to The Cart Item
    //subscribe toThe Cart totalPrice
    //subscribe to the cart totalPrice and Quantity
    this.cartItems = this.cartSevice.cartItems;
    this.cartSevice.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    this.cartSevice.totalPrice.subscribe(
      data => this.totalQuantity = data
    );
    this.cartSevice.computeCartTotals();
  }
  incerementQuantity(cartItems:CartItem){
   this.cartSevice.addToCart(cartItems);
  }
  decrementQuantity(cartItems:CartItem){
  this.cartSevice.decrementService(cartItems)
  }
  remove(cartItem:CartItem){
    this.cartSevice.remove(cartItem);
  }
}
