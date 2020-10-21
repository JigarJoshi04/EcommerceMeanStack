import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

// export interface Product{
//   name: string;
//   price: string;
//   image: {data: Buffer, contentType: string}
// }

@Injectable({
  providedIn: 'root'
})
export class HomeService {
 
  constructor(private http: HttpClient) { }

  public getProduct() : Observable<any>  {
    
    var prod = this.http.get('api/');
    
    console.log(prod);
    
    return prod;
  }
}
