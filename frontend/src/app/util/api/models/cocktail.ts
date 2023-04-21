/* tslint:disable */
/* eslint-disable */
import { RecipeIngredient } from './recipe-ingredient';
export interface Cocktail {
  id: number;
  name: string;
  recipeIngredient?: Array<RecipeIngredient>;
}
