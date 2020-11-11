import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Router } from "@angular/router";
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
import { AuthenticationService} from '../authentication.service'
import { CartPageComponent } from '../cart-page/cart-page.component'
// import { userInfo } from 'os';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 imageurl = [];
 product;

  constructor(private authenticationService :AuthenticationService, private homeService: HomeService, private router: Router,private domSanitizer: DomSanitizer) { }

  buttonClicked(productId){

    const we_user= this.authenticationService.getUserDetails()
    console.log("User Detail are :   ",we_user._id)
    console.log("Button CLicked",productId)
    var body={
      "userId" : we_user._id,
      "productId" :productId
    }
    this.homeService.addProductCart(body).subscribe()
    console.log("HJIgar")
  }
  ngOnInit(): void {
    try{
     this.homeService.getProduct().subscribe(
      user => {
        this.product = user;     
        for (var i = 0; i < this.product.length; i++) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(this.product[i].image.data.data));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        var a = window.btoa(binary);

        this.imageurl.push(this.domSanitizer.bypassSecurityTrustUrl('data:image/png;base64, ' +a));
  
        }
        // console.log(this.imageurl);
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


