import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaffleNewComponent } from './raffle-new.component';
import { RouterModule } from '@angular/router';
import { ConfigComponent } from '../config/config.component';
import { EelsButtonModule } from 'src/app/desing-sytem/button/eels-button.module';
import { EelsInputModule } from 'src/app/desing-sytem/inputs/eels-input/eels-input.module';

@NgModule({
  imports: [
    CommonModule,
    EelsInputModule,
    EelsButtonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: RaffleNewComponent },
      { path: 'config', pathMatch: 'full', component: ConfigComponent },
    ]),
  ],
  declarations: [RaffleNewComponent, ConfigComponent],
})
export class RaffleNewModule {}
