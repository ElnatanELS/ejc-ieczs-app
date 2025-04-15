import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   constructor(private _router:Router, private _formBuilder: FormBuilder, private _auth: AuthService) { }


    form  = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

    loading = false;

    ngOnInit(): void {
    }

    redirectToHome(){

      if (this.form.valid) {
        this.loading = true
        this._auth.SignInFinders(String(this.form.value.email), String(this.form.value.password)).finally(() => this.loading = false)

      }
    }

}
