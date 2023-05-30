/* tslint:disable */
/* eslint-disable */
import { RecipeIngredient } from './recipe-ingredient';
export interface Cocktail {
  cocktailId: string;
  cocktailName: string;
  recipeIngredients?: Array<RecipeIngredient>;
}
