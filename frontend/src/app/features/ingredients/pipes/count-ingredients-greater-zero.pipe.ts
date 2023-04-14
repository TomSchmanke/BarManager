import { Pipe, PipeTransform } from '@angular/core';
import { Ingredient } from '@bar-manager/api';

@Pipe({
  name: 'countIngredientsGreaterZero',
})
export class CountIngredientsGreaterZeroPipe implements PipeTransform {
  transform(value: Ingredient[]): number {
    return value.filter((value) => value.amount > 0).length;
  }
}
