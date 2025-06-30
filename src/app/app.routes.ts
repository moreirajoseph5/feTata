import { Routes } from '@angular/router';
import {ProductComponent} from './pages/product/product.component';

export const routes: Routes = [
  {
    path: 'product',
    loadComponent: () => import('./pages/product/product.component').then(c => c.ProductComponent)
  },
  {
    path: 'newProduct',
    loadComponent: () => import('./pages/product/nuevo/nuevo.component').then(c => c.NuevoComponent)
  },
  { path: "", redirectTo: "product", pathMatch: "full" },
  { path: "**", redirectTo: "product", pathMatch: "full" },
];
