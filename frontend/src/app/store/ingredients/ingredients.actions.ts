import { HttpErrorResponse } from '@angular/common/http';
import { Ingredient } from '@bar-manager/api';
import { createAction, props } from '@ngrx/store';

export const loadIngredients = createAction('[ingredients] load ingredients');

export const loadIngredientsSuccess = createAction(
  '[ingredients] load ingredients success',
  props<{ ingredients: Ingredient[] }>()
);
export const loadIngredientsFailure = createAction(
  '[ingredients] load ingredients failure',
  props<{ error: HttpErrorResponse }>()
);

export const editIngredient = createAction('[ingredients] edit ingredient', props<{ ingredient: Ingredient }>());

export const editIngredientSuccess = createAction(
  '[ingredients] edit ingredient success',
  props<{ ingredient: Ingredient }>()
);
export const editIngredientFailure = createAction(
  '[ingredients] edit ingredient failure',
  props<{ error: HttpErrorResponse }>()
);

export const addIngredient = createAction(
  '[ingredients] add ingredient',
  props<{ ingredientGroupId: string; ingredient: Ingredient }>()
);
export const addIngredientSuccess = createAction(
  '[ingredients] add ingredient success',
  props<{ ingredient: Ingredient }>()
);
export const addIngredientFailure = createAction(
  '[ingredients] add ingredient failure',
  props<{ error: HttpErrorResponse }>()
);

export const deleteIngredient = createAction('[ingredients] delete ingredient', props<{ ingredientId: string }>());
export const deleteIngredientSuccess = createAction(
  '[ingredients] delete ingredient success',
  props<{ ingredientId: string }>()
);
export const deleteIngredientFailure = createAction(
  '[ingredients] delete ingredient failure',
  props<{ error: HttpErrorResponse }>()
);

export const selectSingleIngredient = createAction(
  '[ingredients] select single ingredient',
  props<{ ingredientId?: string }>()
);

export const resetSelectSingleIngredient = createAction('[ingredients] reset select single ingredient');
