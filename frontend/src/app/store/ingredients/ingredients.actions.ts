import { createAction, props } from '@ngrx/store';
import { Ingredient, IngredientGroup } from 'src/app/shared/models/ingredients';

export const loadIngredients = createAction('[ingredients] load ingredients');

export const loadIngredientsSuccess = createAction(
  '[ingredients] load ingredients success',
  props<{ ingredients: IngredientGroup[] }>()
);

export const loadIngredientsFailure = createAction(
  '[ingredients] load ingredients failure',
  props<{ error: any }>()
);

export const showAllIngredientsGroups = createAction(
  '[ingredients] show all ingredients groups'
);

export const showAvailableIngredientsGroups = createAction(
  '[ingredients] show available ingredients groups'
);

export const showUnavailableIngredientsGroups = createAction(
  '[ingredients] show unavailable ingredients groups'
);

export const selectSingleIngredientGroup = createAction(
  '[ingredients] select single ingredient group',
  props<{ ingredientGroupId: string }>()
);

export const resetSelectSingleIngredientGroup = createAction(
  '[ingredients] reset select single ingredient group'
);

export const editIngredientGroup = createAction(
  '[ingredients] edit ingredient group',
  props<{ ingredientGroupId: string }>()
);

export const editIngredientGroupSuccess = createAction(
  '[ingredients] edit ingredient group success',
  props<{ ingredients: IngredientGroup[] }>()
);

export const editIngredient = createAction(
  '[ingredients] edit ingredient',
  props<{ ingredientId: string }>()
);

export const editIngredientSuccess = createAction(
  '[ingredients] edit ingredient success',
  props<{ ingredients: IngredientGroup[] }>()
);

export const deleteIngredientGroup = createAction(
  '[ingredients] delete ingredient group',
  props<{ ingredientGroupId: string }>()
);

export const deleteIngredientGroupSuccess = createAction(
  '[ingredients] delete ingredient group success',
  props<{ ingredients: IngredientGroup[] }>()
);

export const deleteIngredient = createAction(
  '[ingredients] delete ingredient',
  props<{ ingredientId: string }>()
);

export const deleteIngredientSuccess = createAction(
  '[ingredients] delete ingredient success',
  props<{ ingredients: IngredientGroup[] }>()
);
