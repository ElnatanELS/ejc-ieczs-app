import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaffleViewComponent } from './raffle-view.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
                 { path: '', pathMatch: 'full', component: RaffleViewComponent },
               ])
  ],
  declarations: [RaffleViewComponent]
})
export class RaffleViewModule { }
