import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/public/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inscricao',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./modules/public/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'inscricao',
    loadChildren: () =>
      import('./modules/public/registration/registration.module').then((m) => m.RegistrationModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/private/layout/layout.module').then(
        (m) => m.LayoutModule
      ),
  },
  {
    path: 'inscricao-encontrista',
    loadChildren: () =>
      import('./modules/private/finders/finders-new/finders-new.module').then(
        (m) => m.FindersNewModule
      ),
  },
  {
    path: 'sorteio',
    loadChildren: () =>
      import('../app/modules/private/raffle/raffle-new/raffle-new.module').then(
        (m) => m.RaffleNewModule
      ),
  },
  {
    path: 'sorteio-visualizacao',
    loadChildren: () =>
      import('../app/modules/private/raffle/raffle-view/raffle-view.module').then(
        (m) => m.RaffleViewModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
