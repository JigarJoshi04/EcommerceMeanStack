import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  phone: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
  phone?: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private token: string;
readonly ROOT_URL;
  constructor(private http: HttpClient, private router: Router) {
  }

  private saveToken(token: string): void {
    localStorage.setItem("auth-token", token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("auth-token");
    }
    return this.token;
  }

  private request(
    method: "post" | "get",
    type: "login" | "register" | "profile",
    user?: TokenPayload
  ): Observable<any> {
    let base$;

    if (method === "post") {
      base$ = this.http.post(`api/auth/${type}`, user);
    } else {
      base$ = this.http.get(`api/auth/${type}`, {
        headers: { Authorization: `Bearer ${this.getToken()}` }
      });
    }

    const request = base$.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public logout(): void {
    this.token = "";
    window.localStorage.removeItem("auth-token");
    this.router.navigateByUrl("/");
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request("post", "register", user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request("post", "login", user);
  }

  public profile(): Observable<any> {
    return this.request("get", "profile");
  }
}