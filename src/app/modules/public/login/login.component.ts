import { Router } from '@angular/router';
import { Input, Ripple, initTE } from 'tw-elements';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _auth:AuthService) { }

  ngOnInit(): void {
    initTE({ Input });


  }

}
