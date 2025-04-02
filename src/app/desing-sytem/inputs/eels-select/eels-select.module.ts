import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EelsSelectComponent } from './eels-select.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, MatSelectModule, ReactiveFormsModule],
  declarations: [EelsSelectComponent],
  exports: [EelsSelectComponent],
})
export class EelsSelectModule {}
