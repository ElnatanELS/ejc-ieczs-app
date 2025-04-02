import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private _auth: AuthService, private _formBuilder: FormBuilder, private _route: ActivatedRoute) {

  }
  code = this._route.snapshot.queryParams['oobCode'];

  form  = this._formBuilder.group({
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  })

  loading = false


  ngOnInit(): void {
    debugger
  }

  reset(){
    this.loading = true
    this._auth.ResetPassword(this.code, String(this.form.value.password)).finally(() => this.loading = false)
  }

}
