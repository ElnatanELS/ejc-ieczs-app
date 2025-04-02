import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private _router:Router, private _formBuilder: FormBuilder, private _auth: AuthService) { }


  form  = this._formBuilder.group({
    email: ['', Validators.required],
  })

  loading = false;

  ngOnInit(): void {
  }

  forgetPass(){
    if(this.form.valid){
      this.loading = true
      this._auth.ForgotPassword(String(this.form.value.email)).finally(() => this.loading = false)

    }
  }

}
