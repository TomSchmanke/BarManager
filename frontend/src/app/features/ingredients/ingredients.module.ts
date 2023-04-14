import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { IngredientsRoutingModule } from './ingredients-routing.module';
import { TableHeaderComponent } from './components/table-header/table-header.component';
import { ReduceIngredientsAmountPipe } from './pipes/reduce-ingredients-amount.pipe';
import { SortIngredientGroupsByAlphabetPipe } from './pipes/sort-ingredient-groups-by-alphabet.pipe';
import { CountIngredientsGreaterZeroPipe } from './pipes/count-ingredients-greater-zero.pipe';
import { IngredientsOverviewComponent } from './pages/ingredients-overview/ingredients-overview.component';
import { IngredientsEditComponent } from './pages/ingredients-edit/ingredients-edit.component';
import { IngredientsGroupEditComponent } from './pages/ingredients-group-edit/ingredients-group-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TableHeaderComponent,
    ReduceIngredientsAmountPipe,
    SortIngredientGroupsByAlphabetPipe,
    CountIngredientsGreaterZeroPipe,
    IngredientsOverviewComponent,
    IngredientsEditComponent,
    IngredientsGroupEditComponent,
  ],
  imports: [CommonModule, SharedModule, IngredientsRoutingModule, ReactiveFormsModule],
})
export class IngredientsModule {}
