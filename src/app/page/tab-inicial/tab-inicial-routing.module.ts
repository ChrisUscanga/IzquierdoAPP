import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabInicialPage } from './tab-inicial.page';

const routes: Routes = [
  {
    path: '',
    component: TabInicialPage,
    children: [
      {
        path: 'productos',
        loadChildren: () => import('./../../page/productos/productos.module').then( m => m.ProductosPageModule)
      },
      {
        path: 'servicios',
        loadChildren: () => import('./../../page/servicios/servicios.module').then( m => m.ServiciosPageModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('./../../page/menu/menu.module').then( m => m.MenuPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabInicialPageRoutingModule {}
