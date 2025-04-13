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
  ],
  declarations: [FindersNewComponent],
})
export class FindersNewModule {}
