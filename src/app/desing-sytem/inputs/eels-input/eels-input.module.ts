import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EelsInputComponent } from './eels-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    // NgxMaskModule.forRoot(),
  ],
  declarations: [EelsInputComponent],

  exports: [EelsInputComponent],
})
export class EelsInputModule {}
