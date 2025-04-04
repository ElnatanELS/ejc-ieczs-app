import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EelsInputComponent } from './eels-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  declarations: [EelsInputComponent],
  providers: [provideNgxMask()],

  exports: [EelsInputComponent],
})
export class EelsInputModule {}
