import { UnitOfMeasurement } from './unit-of-measurement';

export interface IngredientGroup {
  id: string;
  name: string;
  unitOfMeasurement: UnitOfMeasurement;
  ingredients: Ingredient[];
}

export interface Ingredient {
  id: string;
  name: string;
  description?: string;
  ammount: number;
}
