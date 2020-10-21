import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from "../authentication.service";
import { Router } from "@angular/router";
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  matcher = new MyErrorStateMatcher();

  emailFormControl = new FormControl('', [
    
    Validators.required,
    Validators.email,
  ]);
  
  credentials: TokenPayload = {
    email: "",
    name: "",
    phone: "",
    password: ""
  };



  constructor(private auth: AuthenticationService, private router: Router) {}

  register() {
    this.auth.register(this.credentials).subscribe(
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
