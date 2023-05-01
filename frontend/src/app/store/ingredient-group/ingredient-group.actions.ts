import { HttpErrorResponse } from '@angular/common/http';
import { Ingredient, IngredientGroup } from '@bar-manager/api';
import { createAction, props } from '@ngrx/store';

export const addIngredientGroup = createAction(
  '[ingredientGroup] add ingredient group',
  props<{ ingredientGroup: IngredientGroup }>()
);
export const addIngredientGroupSuccess = createAction(
  '[ingredientGroup] add ingredient group success',
  props<{ ingredientGroup: IngredientGroup }>()
);
export const addIngredientGroupFailure = createAction(
  '[ingredientGroup] add ingredient failure',
  props<{ error: HttpErrorResponse }>()
);

export const loadIngredientGroups = createAction('[ingredientGroup] load ingredient groups');
export const loadIngredientsGroupsSuccess = createAction(
  '[ingredientGroup] load ingredient groups success',
  props<{ ingredientGroups: IngredientGroup[] }>()
);
export const loadIngredientsGroupsFailure = createAction(
  '[ingredientGroup] load ingredient groups failure',
  props<{ error: HttpErrorResponse }>()
);

export const editIngredientGroup = createAction(
  '[ingredientGroup] edit ingredient groups',
  props<{ ingredientGroup: IngredientGroup }>()
);
export const editIngredientGroupSuccess = createAction(
  '[ingredientGroup] edit ingredient groups success',
  props<{ ingredientGroup: IngredientGroup }>()
);
export const editIngredientGroupFailure = createAction(
  '[ingredientGroup] edit ingredient groups failure',
  props<{ error: HttpErrorResponse }>()
);

export const deleteIngredientGroup = createAction(
  '[ingredientGroup] delete ingredient groups',
  props<{ ingredientGroupId: number }>()
);
export const deleteIngredientGroupSuccess = createAction(
  '[ingredientGroup] delete ingredient groups success',
  props<{ ingredientGroupId: number }>()
);
export const deleteIngredientGroupFailure = createAction(
  '[ingredientGroup] delete ingredient groups failure',
  props<{ error: HttpErrorResponse }>()
);

export const showAllIngredientsGroups = createAction('[ingredientGroup] show all ingredients groups');

export const showAvailableIngredientsGroups = createAction('[ingredientGroup] show available ingredients groups');

export const showUnavailableIngredientsGroups = createAction('[ingredientGroup] show unavailable ingredients groups');

export const selectSingleIngredientGroup = createAction(
  '[ingredientGroup] select single ingredient groups',
  props<{ ingredientGroupId?: number }>()
);

export const resetSelectSingleIngredientGroup = createAction('[ingredientGroup] reset select single ingredient groups');
