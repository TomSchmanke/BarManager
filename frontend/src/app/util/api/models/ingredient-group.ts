/* tslint:disable */
/* eslint-disable */
import { Ingredient } from './ingredient';
import { UnitOfMeasurement } from './unit-of-measurement';
export interface IngredientGroup {
  id: number;
  ingredients: Array<Ingredient>;
  name: string;
  unitOfMeasurement: UnitOfMeasurement;
}