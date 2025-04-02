import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EelsProgressBarComponent } from './eels-progress-bar.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  declarations: [
    EelsProgressBarComponent
  ],
  exports: [
    EelsProgressBarComponent
  ],
})
export class EelsProgressBarModule { }
