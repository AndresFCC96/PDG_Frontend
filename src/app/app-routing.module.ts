import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./feature/landing/landing.module').then(m => m.LandingModule) },
  {
    path: 'Auth',
    loadChildren: () => import('./feature/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'Dashboard',
    loadChildren: () => import('./feature/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'Subastas',
    loadChildren: () => import('./feature/productos/productos.module').then(m => m.ProductosModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
