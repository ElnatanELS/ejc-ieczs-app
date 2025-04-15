import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaffleNewComponent } from './raffle-new.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: RaffleNewComponent },
    ]),
  ],
  declarations: [RaffleNewComponent],
})
export class RaffleNewModule {}
