import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientsEditComponent } from './pages/ingredients-edit/ingredients-edit.component';
import { IngredientsGroupEditComponent } from './pages/ingredients-group-edit/ingredients-group-edit.component';
import { IngredientsOverviewComponent } from './pages/ingredients-overview/ingredients-overview.component';

const routes: Routes = [
  {
    path: '',
    component: IngredientsOverviewComponent,
  },
  {
    path: 'edit',
    component: IngredientsEditComponent,
  },
  {
    path: 'group-edit',
    component: IngredientsGroupEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngredientsRoutingModule {}
