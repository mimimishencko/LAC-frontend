import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserAccountComponent} from './user-account.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'info',
    data: { title: 'Личный кабинет'},
    component: UserAccountComponent,
  }
];


@NgModule({
  declarations: [ UserAccountComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserAccountModule { }
