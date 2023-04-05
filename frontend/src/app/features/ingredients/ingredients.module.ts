import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientsComponent } from './ingredients.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IngredientsRoutingModule } from './ingredients-routing.module';
import { TableHeaderComponent } from './components/table-header/table-header.component';
import { ReduceIngredientsAmmountPipe } from './pipes/reduce-ingredients-ammount.pipe';
import { SortIngredientGroupsByAlphabetPipe } from './pipes/sort-ingredient-groups-by-alphabet.pipe';
import { CountIngredientsGreaterZeroPipe } from './pipes/count-ingredients-greater-zero.pipe';



@NgModule({
  declarations: [
    IngredientsComponent,
    TableHeaderComponent,
    ReduceIngredientsAmmountPipe,
    SortIngredientGroupsByAlphabetPipe,
    CountIngredientsGreaterZeroPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    IngredientsRoutingModule
  ]
})
export class IngredientsModule { }
