import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioSessionPage } from './inicio-session.page';

const routes: Routes = [
  {
    path: '',
    component: InicioSessionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioSessionPageRoutingModule {}
