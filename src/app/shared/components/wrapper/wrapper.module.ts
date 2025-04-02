import { WrapperComponent } from './wrapper.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [WrapperComponent],
  exports: [WrapperComponent],
  imports: [
    CommonModule,
    MatIconModule

  ]
})
export class WrapperModule { }
