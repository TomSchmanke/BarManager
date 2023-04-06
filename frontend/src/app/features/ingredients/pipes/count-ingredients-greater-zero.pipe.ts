import { Pipe, PipeTransform } from '@angular/core';
import { Ingredient } from 'src/app/shared/models/ingredients';

@Pipe({
  name: 'countIngredientsGreaterZero',
})
export class CountIngredientsGreaterZeroPipe implements PipeTransform {
  transform(value: Ingredient[]): number {
    return value.filter((value) => value.ammount > 0).length;
  }
}
