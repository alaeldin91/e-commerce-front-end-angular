import { Product } from "./product";

export class CartItem {
productId?:number; 
productName?:string;
 imageUrl?:string ;
 unitPrice?:number;
 quantity?:number ;
 constructor(product:Product){
 this.productId= product.id;
 this.productName = product.name;
 this.imageUrl = product.imageUrl;
 this.unitPrice= product.unitPrice;
 this.quantity =1;

 }

}
