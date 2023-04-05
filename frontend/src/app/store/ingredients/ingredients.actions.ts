import { createAction, props } from '@ngrx/store';
import { IngredientGroup } from 'src/app/shared/models/ingredients';

export const loadIngredients = createAction(
  '[ingredients] load ingredients'
);

export const loadIngredientsSuccess = createAction(
  '[ingredients] load ingredients success',
  props<{ ingredients: IngredientGroup[] }>()
);

export const loadIngredientsFailure = createAction(
  '[ingredients] load ingredients failure',
  props<{ error: any }>()
);

export const showAllIngredients = createAction(
  '[ingredients] show all ingredients'
);

export const showAvailableIngredients = createAction(
  '[ingredients] show available ingredients'
);

export const showUnavailableIngredients = createAction(
  '[ingredients] show unavailable ingredients'
);