import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    NgChartsModule,
    RouterModule.forChild([
          { path: '', pathMatch: 'full', component: HomeComponent },
        ]),
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
