import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purches } from '../common/purches';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutServiceService {
private purchesUrl:string;
 //private purchesUrl="http://localhost:9194/api/v1/order/placeOrder";
  constructor(private httpClient:HttpClient) { 
    this.purchesUrl="http://localhost:8087/api/v1/order/placeOrder";
  }

  placeOrder(purches:Purches):Observable<any>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpClient.post<Purches>(this.purchesUrl,purches,{
    headers,
    });
  }
}
