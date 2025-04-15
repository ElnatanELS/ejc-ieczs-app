import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindersNewComponent } from './finders-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EelsButtonModule } from 'src/app/desing-sytem/button/eels-button.module';
import { EelsInputModule } from 'src/app/desing-sytem/inputs/eels-input/eels-input.module';
import { EelsRadioModule } from 'src/app/desing-sytem/inputs/eels-radio/eels-radio.module';
import { EelsSelectModule } from 'src/app/desing-sytem/inputs/eels-select/eels-select.module';
import { EelsProgressBarModule } from 'src/app/desing-sytem/progress-bar/eels-progress-bar.module';
import { RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { LoginComponent } from './login/login.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    EelsInputModule,
    EelsButtonModule,
    EelsRadioModule,
    EelsSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    EelsProgressBarModule,
    EelsSelectModule,
    RouterModule.forChild([
          { path: '',
            component: FindersNewComponent,
             children: [
                {
                  path: '',
                  redirectTo: 'login',
                  pathMatch: 'full'
                },
                { path: 'login', component: LoginComponent },
                { path: 'formulario', component: FormComponent },
                { path: 'confirmacao', component: ConfirmationComponent },
              ] },
        ]),
  ],
  declarations: [FindersNewComponent, FormComponent, LoginComponent],
})
export class FindersNewModule {}
