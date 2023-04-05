import { Pipe, PipeTransform } from '@angular/core';
import { Ingredient } from 'src/app/shared/models/ingredients';

@Pipe({
  name: 'reduceIngredientsAmmount'
})
export class ReduceIngredientsAmmountPipe implements PipeTransform {

  transform(value: Ingredient[]): number {
    return value.reduce((acc, value) => acc + value.ammount, 0);
  }

}
