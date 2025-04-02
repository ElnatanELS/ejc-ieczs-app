import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { MemberService } from './../service/member.service';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewMemberComponent } from './new-member.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EelsButtonModule } from 'src/app/desing-sytem/button/eels-button.module';
import { EelsInputModule } from 'src/app/desing-sytem/inputs/eels-input/eels-input.module';
import { RouterModule } from '@angular/router';
import { WrapperModule } from 'src/app/shared/components/wrapper/wrapper.module';
import { EelsSelectModule } from 'src/app/desing-sytem/inputs/eels-select/eels-select.module';
import { AuthService } from 'src/app/core/auth/auth.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EelsProgressBarModule } from 'src/app/desing-sytem/progress-bar/eels-progress-bar.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    EelsButtonModule,
    WrapperModule,
    EelsInputModule,
    EelsSelectModule,
    EelsProgressBarModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: NewMemberComponent },
    ]),
  ],
  providers:[MemberService],
  declarations: [NewMemberComponent],
  exports: [NewMemberComponent],
})
export class NewMemberModule {}
