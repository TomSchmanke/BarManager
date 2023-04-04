import { createAction, props } from '@ngrx/store';

export const loadRecipes = createAction(
  '[recipes] load recipes',
  props<{ uid: string }>()
);

export const loadRecipesSuccess = createAction(
  '[recipes] load recipes success',
  props<{ recipes: any }>()
);

export const loadRecipesFailure = createAction(
  '[recipes] load recipes failure',
  props<{ error: any }>()
);