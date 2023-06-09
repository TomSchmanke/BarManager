import { Pipe, PipeTransform } from '@angular/core';
import { IngredientGroup } from '@bar-manager/api';

@Pipe({
  name: 'sortIngredientGroupsByAlphabet',
})
export class SortIngredientGroupsByAlphabetPipe implements PipeTransform {
  transform(value: IngredientGroup[]): IngredientGroup[] {
    const arrayToSort = [...value];
    return arrayToSort.sort((a, b) => (a.ingredientGroupName! > b.ingredientGroupName! ? 1 : -1));
  }
}
