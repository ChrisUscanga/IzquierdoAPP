import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'listing',
        loadChildren: () => import('../screens/listing/listing.module').then( m => m.ListingPageModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('../screens/cart/cart.module').then( m => m.CartPageModule)
      },
      {
        path: 'usuario',
        loadChildren: () => import('../page/usuario/usuario.module').then( m => m.UsuarioPageModule)
      },
      {
        path: 'reservaciones',
        loadChildren: () => import('../page/reservaciones/reservaciones.module').then( m => m.ReservacionesPageModule)
      },
      {
        path: '',
        redirectTo: 'listing',
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
