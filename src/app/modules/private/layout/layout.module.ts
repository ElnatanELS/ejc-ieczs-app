import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';

import { MatIconModule } from '@angular/material/icon';
import { AuthService } from 'src/app/core/auth/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, LayoutRoutingModule, MatIconModule],
  exports: [LayoutComponent],
})
export class LayoutModule {}
