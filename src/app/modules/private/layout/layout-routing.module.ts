import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren: () =>
          import('../home/home.module').then(
            (m) => m.HomeModule
          ),
      },
      {
        path: 'inscricao-encontrista',
        loadChildren: () =>
          import('../finders/finders-new/finders-new.module').then(
            (m) => m.FindersNewModule
          ),
      },
      {
        path: 'member-list',
        loadChildren: () =>
          import('../members/member-list/member-list.module').then(
            (m) => m.MemberListModule
          ),
      },
      {
        path: 'finders-list',
        loadChildren: () =>
          import('../finders/finders-list/finders-list.module').then(
            (m) => m.FindersListModule
          ),
      },
      {
        path: 'sorteio',
        loadChildren: () =>
          import('../raffle/raffle-new/raffle-new.module').then(
            (m) => m.RaffleNewModule
          ),
      },
      {
        path: 'sorteio-visualizacao',
        loadChildren: () =>
          import('../raffle/raffle-view/raffle-view.module').then(
            (m) => m.RaffleViewModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
