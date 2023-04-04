import { createAction, props } from '@ngrx/store';

export const loadIngredients = createAction(
  '[ingredients] load ingredients',
  props<{ uid: string }>()
);

export const loadIngredientsSuccess = createAction(
  '[ingredients] load ingredients success',
  props<{ ingredients: any }>()
);

export const loadIngredientsFailure = createAction(
  '[ingredients] load ingredients failure',
  props<{ error: any }>()
);