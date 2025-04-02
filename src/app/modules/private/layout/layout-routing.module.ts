import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'new-member',
        loadChildren: () =>
          import('../members/new-member/new-member.module').then(
            (m) => m.NewMemberModule
          ),
      },
      {
        path: 'member-list',
        loadChildren: () =>
          import('../members/member-list/member-list.module').then(
            (m) => m.MemberListModule
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
