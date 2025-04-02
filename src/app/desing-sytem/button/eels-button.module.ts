import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EelsButtonComponent } from './button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatIconModule, MatButtonModule],
  declarations: [EelsButtonComponent],
  exports: [EelsButtonComponent],
})
export class EelsButtonModule {}
