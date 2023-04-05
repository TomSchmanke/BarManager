import { Pipe, PipeTransform } from '@angular/core';
import { IngredientGroup } from 'src/app/shared/models/ingredients';

@Pipe({
  name: 'sortIngredientGroupsByAlphabet'
})
export class SortIngredientGroupsByAlphabetPipe implements PipeTransform {

  transform(value: IngredientGroup[]): IngredientGroup[] {
    const arrayToSort = [...value];
    return arrayToSort.sort((a, b) => a.name > b.name ? 1 : -1);
  }

}
