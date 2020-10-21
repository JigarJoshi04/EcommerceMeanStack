import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from "../authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  credentials: TokenPayload = {
    email: "",
    password: ""
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  login() {
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl("/");
      },
      err => {
        console.error(err);
      }
    );
  }

  ngOnInit(): void {
  }

}
