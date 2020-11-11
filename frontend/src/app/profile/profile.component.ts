import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService, UserDetails } from "../authentication.service";
import { HomeService } from '../home.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  details: UserDetails;
  user_id ;
  constructor(private domSanitizer: DomSanitizer ,private homeService: HomeService, private authenticationService: AuthenticationService) {}

  imageurl = [];
  product;
  total = 0;
  grand_total = 0;
  semi_total =[];
  shipping = 100

  ngOnInit() {
    const we_user= this.authenticationService.getUserDetails()
    const final_user = this.homeService.userInfo(we_user._id).subscribe()
    console.log("Profile hitsssssssssssssssssss")
    var first_user = final_user[0]
    // console.log(final_user)
    // console.log(first_user)

    try{
      console.log("here123456")
      this.homeService.userInfo(we_user._id).subscribe(
       user => {
         this.product = user;
         console.log("Her-------------------->")
         console.log(this.product)
         for (var i = 0; i < this.product.length; i++) {
         var binary = '';
         var bytes = [].slice.call(new Uint8Array(this.product[i].image.data.data));
         bytes.forEach((b) => binary += String.fromCharCode(b));
         var a = window.btoa(binary);
 
         this.imageurl.push(this.domSanitizer.bypassSecurityTrustUrl('data:image/png;base64, ' +a));
   
         }

       },
       err => {
        console.log("hereerrrrrrrrrrrrrrrrror")
         console.error(err);
       }
     );

    }
    catch(err){
         console.log(err);
         
    }
  }
}
