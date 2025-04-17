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
import { EelsRadioModule } from 'src/app/desing-sytem/inputs/eels-radio/eels-radio.module';
import { RegistrationService } from './registration.service';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { PaymentComponent } from './payment/payment.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { EelsSelectModule } from "../../../desing-sytem/inputs/eels-select/eels-select.module";
import { ChipsComponent } from './confirmation/chips/chips.component';

@NgModule({

  imports: [
    CommonModule,
    RegistrationRoutingModule,
    EelsInputModule,
    EelsButtonModule,
    EelsRadioModule,
    EelsSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    EelsProgressBarModule,
    EelsSelectModule
],
  declarations: [RegistrationComponent, FirstAcessRegistrationComponent, PaymentComponent, ConfirmationComponent, ChipsComponent],
  providers: [RegistrationService,SnackbarService],
})
export class RegistrationModule {}
