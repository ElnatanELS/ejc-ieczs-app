import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EelsRadioComponent } from './eels-radio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  imports: [CommonModule, MatRadioModule, ReactiveFormsModule],
  declarations: [EelsRadioComponent],
  exports: [EelsRadioComponent],
})
export class EelsRadioModule {}
