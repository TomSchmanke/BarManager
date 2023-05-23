/* tslint:disable */
/* eslint-disable */
import { Ingredient } from './ingredient';
import { UnitOfMeasurement } from './unit-of-measurement';
export interface IngredientGroup {
  ingredientGroupId: string;
  ingredientGroupName?: string;
  ingredients?: Array<Ingredient>;
  unitOfMeasurement: UnitOfMeasurement;
}
