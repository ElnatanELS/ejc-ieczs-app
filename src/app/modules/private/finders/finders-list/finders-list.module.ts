import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { EelsButtonModule } from 'src/app/desing-sytem/button/eels-button.module';
import { EelsInputModule } from 'src/app/desing-sytem/inputs/eels-input/eels-input.module';
import { EelsSelectModule } from 'src/app/desing-sytem/inputs/eels-select/eels-select.module';
import { TableModule } from 'src/app/desing-sytem/table/table.module';
import { WrapperModule } from 'src/app/shared/components/wrapper/wrapper.module';
import { FindersListComponent } from './finders-list.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ModalModule } from 'src/app/shared/components/modal/modal.module';
import { FinderPressComponent } from '../shared/finder-press/finder-press.component';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  imports: [
   CommonModule,
       EelsInputModule,
       EelsSelectModule,
       EelsButtonModule,
       MatIconModule,
       WrapperModule,
       TableModule,
      ModalModule,
      FormsModule,
      AngularSvgIconModule.forRoot(),

       // EelsTableModule,
       RouterModule.forChild([
         { path: '', pathMatch: 'full', component: FindersListComponent },
       ]),
  ],
  declarations: [FindersListComponent, FinderPressComponent]
})
export class FindersListModule {


 }
