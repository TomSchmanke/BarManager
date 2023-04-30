import { HttpErrorResponse } from '@angular/common/http';
import { Ingredient, IngredientGroup } from '@bar-manager/api';
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
  props<{ ingredientGroupId: number; ingredient: Ingredient }>()
);
export const addIngredientSuccess = createAction(
  '[ingredients] add ingredient success',
  props<{ ingredient: Ingredient }>()
);
export const addIngredientFailure = createAction(
  '[ingredients] add ingredient failure',
  props<{ error: HttpErrorResponse }>()
);

export const deleteIngredient = createAction('[ingredients] delete ingredient', props<{ ingredientId: number }>());
export const deleteIngredientSuccess = createAction(
  '[ingredients] delete ingredient success',
  props<{ ingredientId: number }>()
);
export const deleteIngredientFailure = createAction(
  '[ingredients] delete ingredient success',
  props<{ error: HttpErrorResponse }>()
);

export const addIngredientGroup = createAction(
  '[ingredientGroup] add ingredient group',
  props<{ ingredientGroup: IngredientGroup }>()
);
export const addIngredientGroupSuccess = createAction(
  '[ingredientGroup] add ingredient group success',
  props<{ ingredients: IngredientGroup[] }>()
);
export const addIngredientGroupFailure = createAction(
  '[ingredientGroup] add ingredient failure',
  props<{ error: HttpErrorResponse }>()
);

export const loadIngredientGroups = createAction('[ingredientGroup] load ingredients');
export const loadIngredientsGroupsSuccess = createAction(
  '[ingredientGroup] load ingredients success',
  props<{ ingredientGroups: IngredientGroup[] }>()
);
export const loadIngredientsGroupsFailure = createAction(
  '[ingredientGroup] load ingredients failure',
  props<{ error: HttpErrorResponse }>()
);

export const editIngredientGroup = createAction(
  '[ingredients] edit ingredient group',
  props<{ ingredientGroup: IngredientGroup }>()
);
export const editIngredientGroupSuccess = createAction(
  '[ingredientGroup] edit ingredient group success',
  props<{ ingredientGroup: IngredientGroup }>()
);
export const editIngredientGroupFailure = createAction(
  '[ingredientGroup] edit ingredient group success',
  props<{ error: HttpErrorResponse }>()
);

export const deleteIngredientGroup = createAction(
  '[ingredientGroup] delete ingredient group',
  props<{ ingredientGroupId: number }>()
);

export const deleteIngredientGroupSuccess = createAction(
  '[ingredientGroup] delete ingredient group success',
  props<{ ingredientGroupId: number }>()
);
export const deleteIngredientGroupFailure = createAction(
  '[ingredientGroup] delete ingredient group failure',
  props<{ error: HttpErrorResponse }>()
);

export const showAllIngredientsGroups = createAction('[ingredients] show all ingredients groups');

export const showAvailableIngredientsGroups = createAction('[ingredients] show available ingredients groups');

export const showUnavailableIngredientsGroups = createAction('[ingredients] show unavailable ingredients groups');

export const selectSingleIngredientGroup = createAction(
  '[ingredients] select single ingredient group',
  props<{ ingredientGroupId?: number }>()
);

export const resetSelectSingleIngredientGroup = createAction('[ingredients] reset select single ingredient group');

export const selectSingleIngredient = createAction(
  '[ingredients] select single ingredient',
  props<{ ingredientId?: number }>()
);

export const resetSelectSingleIngredient = createAction('[ingredients] reset select single ingredient');
