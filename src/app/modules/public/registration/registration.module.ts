import { RegistrationRoutingModule } from './registration-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EelsButtonModule } from 'src/app/desing-sytem/button/eels-button.module';
import { EelsInputModule } from 'src/app/desing-sytem/inputs/eels-input/eels-input.module';
import { EelsProgressBarModule } from 'src/app/desing-sytem/progress-bar/eels-progress-bar.module';
import { FirstAcessRegistrationComponent } from './first-acess-registration/first-acess-registration.component';

@NgModule({

  imports: [
    CommonModule,
    RegistrationRoutingModule,
    EelsInputModule,
    EelsButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    EelsProgressBarModule,
  ],
  declarations: [RegistrationComponent, FirstAcessRegistrationComponent],
})
export class RegistrationModule {}
