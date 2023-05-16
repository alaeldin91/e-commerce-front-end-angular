import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable, from, lastValueFrom } from 'rxjs';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(@Inject(OKTA_AUTH) private oktaAuth:OktaAuth) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  return from(this.handleAccess(request,next));
  }
  private async handleAccess(request:HttpRequest<any>,next:HttpHandler)  :Promise<HttpEvent<any>>{
  const secureEndPoints = ['http:localhost:9094/api/v1/order'];
  if(secureEndPoints.some(url=>request.urlWithParams.includes(url))){
  const accessToken = this.oktaAuth.getAccessToken();
  request =  request.clone({
    setHeaders:{
      Authorization: 'Bearer '+accessToken,
    }
  });
  }
  return await lastValueFrom(next.handle(request));
  }
}
