import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
// Initialization for ES Users
import { Collapse, Dropdown, Sidenav, initTE } from 'tw-elements';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(private _router:Router, public _auth: AuthService) {}

  packageJsonInfo = require('package.json');

  isLogin = this._auth.isLoggedIn

  ngOnInit(): void {
    initTE({ Collapse, Dropdown, Sidenav });
  }


  redirectToLogin(){
    this._auth.SignOut()
  }
}
