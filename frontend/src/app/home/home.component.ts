import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Router } from "@angular/router";
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 imageurl = [];
 product;

  constructor(private homeService: HomeService, private router: Router,private domSanitizer: DomSanitizer) { }


  ngOnInit(): void {
    try{
     this.homeService.getProduct().subscribe(
      user => {
        this.product = user;
        console.log(this.product[0].image.data);
        
        for (var i = 0; i < this.product.length; i++) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(this.product[i].image.data.data));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        var a = window.btoa(binary);

        this.imageurl.push(this.domSanitizer.bypassSecurityTrustUrl('data:image/png;base64, ' +a));
  
        }
        console.log(this.imageurl);
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


