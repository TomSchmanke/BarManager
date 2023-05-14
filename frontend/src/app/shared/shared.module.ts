import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { StandloneBarButtonDirective } from './directives/bar-button/bar-button.directive';
import { StandloneBarInputDirective } from './directives/bar-input/bar-input.directive';
import { NotFoundWidgetComponent } from './components/not-found-widget/not-found-widget.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { CountIngredientsGreaterZeroPipe } from './pipes/count-ingredients-greater-zero.pipe';
import { ReduceIngredientsAmountPipe } from './pipes/reduce-ingredients-amount.pipe';
import { SortIngredientGroupsByAlphabetPipe } from './pipes/sort-ingredient-groups-by-alphabet.pipe';

@NgModule({
  declarations: [
    DeleteModalComponent,
    NotFoundWidgetComponent,
    LoadingSpinnerComponent,
    ReduceIngredientsAmountPipe,
    SortIngredientGroupsByAlphabetPipe,
    CountIngredientsGreaterZeroPipe,
  ],
  imports: [CommonModule, StandloneBarButtonDirective, StandloneBarInputDirective],
  exports: [
    DeleteModalComponent,
    StandloneBarButtonDirective,
    StandloneBarInputDirective,
    NotFoundWidgetComponent,
    LoadingSpinnerComponent,
    ReduceIngredientsAmountPipe,
    SortIngredientGroupsByAlphabetPipe,
    CountIngredientsGreaterZeroPipe,
  ],
})
export class SharedModule {}
