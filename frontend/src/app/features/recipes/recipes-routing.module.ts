import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipesEditComponent } from './pages/recipes-edit/recipes-edit.component';
import { RecipesOverviewComponent } from './pages/recipes-overview/recipes-overview.component';

const routes: Routes = [
  {
    path: '',
    component: RecipesOverviewComponent,
  },
  {
    path: 'edit',
    component: RecipesEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
