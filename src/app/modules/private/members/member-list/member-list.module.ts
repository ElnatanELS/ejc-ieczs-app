import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from './member-list.component';
import { EelsInputModule } from '../../../../desing-sytem/inputs/eels-input/eels-input.module';
import { EelsSelectModule } from '../../../../desing-sytem/inputs/eels-select/eels-select.module';
import { EelsButtonModule } from '../../../../desing-sytem/button/eels-button.module';
import { TableModule } from '../../../../desing-sytem/table/table.module';
import { WrapperModule } from 'src/app/shared/components/wrapper/wrapper.module';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ModalModule } from 'src/app/shared/components/modal/modal.module'; // Ensure this path is correct
import { ChipsModule } from 'src/app/shared/components/chips/chips.module';

@NgModule({
  declarations: [MemberListComponent],
  imports: [
    CommonModule,
    EelsInputModule,
    EelsSelectModule,
    EelsButtonModule,
    MatIconModule,
    WrapperModule,
    TableModule,
    ModalModule,
    ChipsModule,

    // EelsTableModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: MemberListComponent },
    ]),
  ],
  exports: [MemberListComponent],
})
export class MemberListModule {}
