/* tslint:disable */
/* eslint-disable */
import { Bar } from './bar';
import { IngredientGroup } from './ingredient-group';
export interface Cocktails {
  availableAt?: Array<Bar>;
  id: number;
  ingredients: Array<IngredientGroup>;
  name: string;
}
