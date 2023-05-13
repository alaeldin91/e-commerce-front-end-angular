import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent  implements OnInit{
  isAuthnicated?:boolean = false;
  userFullName:string ='';
  constructor(private oktaAuthService:OktaAuthStateService,@Inject(OKTA_AUTH) private oktaAuth:OktaAuth ){

  }
  ngOnInit(): void {
    this.oktaAuthService.authState$.subscribe(
     (result)=>{
      this.isAuthnicated = result.isAuthenticated
      this.getUserDetails();
         }
    );
  }
  getUserDetails() {
  if(this.isAuthnicated){
    this.oktaAuth.getUser().then(
      (res=>{
        this.userFullName = res.name as string;
      })
    )
  }
  }
 logout(){
  this.oktaAuth.signOut();
 }
}
