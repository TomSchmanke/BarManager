import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { IngredientsDetailComponent } from './components/ingredients-detail/ingredients-detail.component';
import { IngredientsMasterComponent } from './components/ingredients-master/ingredients-master.component';
import { IngredientsRoutingModule } from './ingredients-routing.module';
import { IngredientsEditComponent } from './pages/ingredients-edit/ingredients-edit.component';
import { IngredientsGroupEditComponent } from './pages/ingredients-group-edit/ingredients-group-edit.component';
import { IngredientsOverviewComponent } from './pages/ingredients-overview/ingredients-overview.component';

@NgModule({
  declarations: [
    IngredientsOverviewComponent,
    IngredientsEditComponent,
    IngredientsGroupEditComponent,
    IngredientsMasterComponent,
    IngredientsDetailComponent,
  ],
  imports: [CommonModule, SharedModule, IngredientsRoutingModule, ReactiveFormsModule],
})
export class IngredientsModule {}
