import { Pipe, PipeTransform } from '@angular/core';
import { Ingredient } from '@bar-manager/api';

@Pipe({
  name: 'reduceIngredientsAmount',
})
export class ReduceIngredientsAmountPipe implements PipeTransform {
  transform(value: Ingredient[]): number {
    return value.reduce((acc, value) => acc + value.amount, 0);
  }
}
