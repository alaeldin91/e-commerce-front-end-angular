import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 import {  OrderHistory } from '../common/order-history';
@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
private OrderUrl ="http://localhost:9194/api/v1/order";
  constructor(private httpClient:HttpClient) {}

getOrderHistory(thEmail:string):Observable<OrderHistory>{

  const orderSearchUrl = `${this.OrderUrl}/searchOrders/${thEmail}`;
  
  return this.httpClient.get<OrderHistory>(orderSearchUrl);
}
}