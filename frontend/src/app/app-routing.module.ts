import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './logged-in.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./features/start/start.module').then(m => m.StartModule),
  // },

  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'orders',
    loadChildren: () => import('./features/orders/orders.module').then(m => m.OrdersModule),
    canActivate: [LoggedInGuard],
  },
  {
    path: 'ingredients',
    loadChildren: () => import('./features/ingredients/ingredients.module').then(m => m.IngredientsModule),
    canActivate: [LoggedInGuard],
  },
  {
    path: 'recipes',
    loadChildren: () => import('./features/recipes/recipes.module').then(m => m.RecipesModule),
    canActivate: [LoggedInGuard],
  },

  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [LoggedInGuard],
})
export class AppRoutingModule {}
