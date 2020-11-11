import { Component } from '@angular/core';
import { AuthenticationService } from "./authentication.service";
import { CartPageComponent } from "./cart-page/cart-page.component"
import { Router } from '@angular/router'
import { HomeService } from './home.service';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
//import { type } from 'os';
// import { SharedService } from './sharedService' 
import { Injectable } from '@angular/core';
import { SharedService } from './sharedService';
// import { HomeService } from './home.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  message: string;
  sharedService :SharedService
  title = 'frontend';
  constructor(public domSanitizer: DomSanitizer, public homeService: HomeService,public authenticationService: AuthenticationService,public router: Router,public auth: AuthenticationService) {}

  profileClicked(){
    console.log("Profile Button clicked")
    this.router.navigateByUrl('/profile');
  }

  cartClicked(){
    const we_user= this.authenticationService.getUserDetails();
    console.log("Here2")
    this.router.navigateByUrl('/cart');
    console.log(we_user._id)
    console.log(typeof(we_user._id))
    // this.sharedService.currentMessage.subscribe(message => this.message =this.message)
    // new CartPageComponent(this.homeService,this.domSanitizer);
    // this.router.navigateByUrl('cart/')
    
  }
}
