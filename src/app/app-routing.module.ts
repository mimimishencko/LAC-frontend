import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PdfPageComponent} from './Components/pdf-page/pdf-page.component';
import {ComplaintFormComponent} from './Components/complaint-form/complaint-form.component';


const routes: Routes = [
  {
    path: '',
    data: { title: 'Инфромация о жалобе'},
    component: ComplaintFormComponent,
  },
  {
    path: 'pdf',
    data: { title: 'Досудебная жалоба'},
    component: PdfPageComponent
  },
  {
    path: 'user',
    loadChildren: () => import('./Components/user-account/user-account.module').then(m => m.UserAccountModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
