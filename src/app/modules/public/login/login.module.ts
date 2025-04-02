import { SnackbarService } from './../../../shared/services/snackbar/snackbar.service';
import { EelsButtonModule } from './../../../desing-sytem/button/eels-button.module';
import { EelsInputModule } from './../../../desing-sytem/inputs/eels-input/eels-input.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SignInComponent } from './sign-in/sign-in.component';
import { FirstAcessComponent } from './first-acess/first-acess.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { EelsProgressBarModule } from 'src/app/desing-sytem/progress-bar/eels-progress-bar.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignInComponent,
    FirstAcessComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    EelsInputModule,
    EelsButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    EelsProgressBarModule
  ],
  providers: [AuthService, SnackbarService]
})
export class LoginModule { }
