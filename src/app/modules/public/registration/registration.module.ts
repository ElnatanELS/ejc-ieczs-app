import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EelsButtonModule } from 'src/app/desing-sytem/button/eels-button.module';
import { EelsInputModule } from 'src/app/desing-sytem/inputs/eels-input/eels-input.module';
import { EelsRadioModule } from 'src/app/desing-sytem/inputs/eels-radio/eels-radio.module';
import { EelsProgressBarModule } from 'src/app/desing-sytem/progress-bar/eels-progress-bar.module';
import { ChipsModule } from 'src/app/shared/components/chips/chips.module';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { EelsSelectModule } from "../../../desing-sytem/inputs/eels-select/eels-select.module";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { FirstAcessRegistrationComponent } from './first-acess-registration/first-acess-registration.component';
import { PaymentComponent } from './payment/payment.component';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { RegistrationService } from './registration.service';
import { MatFormFieldModule } from '@angular/material/form-field';

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
    EelsSelectModule,
    ChipsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule
],
  declarations: [RegistrationComponent, FirstAcessRegistrationComponent, PaymentComponent, ConfirmationComponent],
  providers: [RegistrationService,SnackbarService],
})
export class RegistrationModule {}
