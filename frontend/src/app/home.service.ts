import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { provideRoutes, Router } from "@angular/router";
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

  public userInfo(user_id) : Observable <any> {
    var userdetails = this.http.get('api/profile/',{
      headers:{
        'val': user_id,
      }
    })
    console.log("INside user infp")
    console.log(userdetails)
    return userdetails
  }

  public getProduct() : Observable<any>  {
    
    var prod = this.http.get('api/');
    
    console.log(prod);
    
    return prod;
  }

  public deleteProductCart(bo) : Observable<any> {
    const cartprod = this.http.post('api/cart/delete',bo);
    return cartprod
  }

  public cartProduct(user_id) : Observable<any> {

    const cartprod = this.http.get('api/cart/v',{
      headers:{
        'val' : user_id,
      }
    });
    console.log("Cart Product: ",cartprod);
    console.log("First Product : ",cartprod[0]);
    return cartprod;
    
  }

  public addProductCart(bo) : Observable<any> {
    var body = bo;
    console.log("Add product Cart", body)
    var cart = this.http.post('api/cart/',body);
    console.log(cart);
    return cart;
  }


  public updateProductCart(bo) : Observable<any> {
    var body = bo
    console.log("Update product Cart",body)
    var cart = this.http.post('api/cart/update',body);
    console.log(cart)
    return cart
  }
}
