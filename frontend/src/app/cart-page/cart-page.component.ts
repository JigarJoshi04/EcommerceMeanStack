import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { HomeService } from '../home.service';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
import { SharedService } from '../sharedService'
import { stringify } from 'querystring';
import { CommonModule } from "@angular/common";
import { AuthenticationService } from "../authentication.service";
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})

export class CartPageComponent implements OnInit {
  message:string;
  // sharedService: SharedService
  constructor(public router: Router, public authenticationService: AuthenticationService ,public homeService : HomeService,private domSanitizer: DomSanitizer) { }
  imageurl = [];
  product;
  total = 0;
  grand_total = 0;
  semi_total =[];
  shipping = 100

  removeProduct(prod_id){
    console.log("Removing")
    const we_user= this.authenticationService.getUserDetails()
    var body={
      "userId" : we_user._id,
      "productId" :prod_id
    }
    console.log("Product id : ",prod_id)
    this.homeService.deleteProductCart(body).subscribe()
    console.log("Success")
    this.ngOnInit()
  }
  unknownClicked(prod_id,value){
    try{

    
    var hu = (document.getElementById((prod_id)) as HTMLInputElement).value
    console.log("Valueeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",hu)
    console.log("Unknown button click")
    console.log(prod_id)

    const we_user= this.authenticationService.getUserDetails()
    console.log("User Detail are :   ",we_user._id)
    console.log("Button CLicked",prod_id)
    var body={
      "userId" : we_user._id,
      "productId" :prod_id,
      "quant":hu
    }
    this.homeService.updateProductCart(body).subscribe()
    console.log("HJIgar")
    this.ngOnInit()
  }
  catch (err){
    console.log(err)
  }
  }


  ngOnInit(){
    this.total = 0;
    this.semi_total= []
    this.grand_total = 0;
    const we_user= this.authenticationService.getUserDetails();
    // var ids= this.sharedService.currentMessage
    console.log("Here")
    console.log(we_user)
    // console.log("In cart page component")
    try{
      this.homeService.cartProduct(we_user._id).subscribe(
       user => {
         this.product = user;

         console.log(this.product)
         for (var i = 0; i < this.product.length; i++) {
         var binary = '';
         var bytes = [].slice.call(new Uint8Array(this.product[i].image.data.data));
         bytes.forEach((b) => binary += String.fromCharCode(b));
         var a = window.btoa(binary);
 
         this.imageurl.push(this.domSanitizer.bypassSecurityTrustUrl('data:image/png;base64, ' +a));
   
         }
         console.log(user)
         for(var j =0; j<this.product.length; j= j+1){
          console.log("Quantity : ",this.product[j].__v)
          console.log("Price    : ",this.product[j].price )
          this.semi_total.push((this.product[j].__v*this.product[j].price ))
          this.total = this.total + (this.product[j].__v*this.product[j].price )
        }
         // console.log(this.imageurl);
         this.grand_total = this.total + this.shipping
       },
       err => {
         console.error(err);
       }
     );

    }
    catch(err){
         console.log(err);
         
    }
  }
}

