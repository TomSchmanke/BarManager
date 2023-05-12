/* tslint:disable */
/* eslint-disable */
import { RecipeIngredient } from './recipe-ingredient';
export interface Cocktail {
  id: string;
  name: string;
  recipeIngredient?: Array<RecipeIngredient>;
}
