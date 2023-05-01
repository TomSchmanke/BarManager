import { Ingredient, IngredientGroup, IngredientGroupsService } from '@bar-manager/api';
import { createReducer, on } from '@ngrx/store';

import * as IngredientGroupActions from './ingredient-group.actions';
import { HttpErrorResponse } from '@angular/common/http';

export const featureKey = 'ingredients-groups';

export interface IngredientGroupState {
  ingredientGroups: IngredientGroup[];
  shownIngredientGroups: IngredientGroup[];
  selectedIngredientGroup?: IngredientGroup;
  loading: boolean;
  error?: HttpErrorResponse;
}

export const initialState: IngredientGroupState = {
  ingredientGroups: [],
  shownIngredientGroups: [],
  selectedIngredientGroup: undefined,
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(IngredientGroupActions.loadIngredientGroups, state => ({
    ...state,
    loading: true,
  })),
  on(IngredientGroupActions.loadIngredientsGroupsSuccess, (state, action) => ({
    ...state,
    ingredientGroups: action.ingredientGroups,
    loading: false,
  })),
  on(IngredientGroupActions.loadIngredientsGroupsFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
  })),

  on(IngredientGroupActions.deleteIngredientGroup, state => ({
    ...state,
    loading: true,
  })),
  on(IngredientGroupActions.deleteIngredientGroupSuccess, (state, action) => ({
    ...state,
    loading: false,
    ingredientGroups: state.ingredientGroups.filter(ingredientGroup => ingredientGroup.id !== action.ingredientGroupId),
    selectedIngredients: 'all',
  })),
  on(IngredientGroupActions.deleteIngredientGroupFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
  })),

  on(IngredientGroupActions.editIngredientGroup, state => ({
    ...state,
    loading: true,
  })),
  on(IngredientGroupActions.editIngredientGroupSuccess, (state, action) => ({
    ...state,
    loading: false,
    ingredientsGroups: state.ingredientGroups.map((ingredientGroup: IngredientGroup) => {
      return ingredientGroup.id === action.ingredientGroup.id ? action.ingredientGroup : ingredientGroup;
    }),
    selectedIngredients: 'all',
  })),
  on(IngredientGroupActions.editIngredientGroupFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
  })),

  on(IngredientGroupActions.selectSingleIngredientGroup, (state, action) => ({
    ...state,
    selectedIngredientGroup: state.ingredientGroups.find(value => value.id === action.ingredientGroupId),
  })),
  on(IngredientGroupActions.resetSelectSingleIngredientGroup, state => ({
    ...state,
    selectedIngredientGroup: undefined,
  })),

  on(IngredientGroupActions.addIngredientGroup, state => ({
    ...state,
    loading: true,
  })),
  on(IngredientGroupActions.addIngredientGroupSuccess, (state, action) => ({
    ...state,
    loading: false,
    ingredients: [...state.ingredientGroups, action.ingredientGroup],
  })),
  on(IngredientGroupActions.addIngredientGroupFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
  }))
);
