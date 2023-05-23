import { IngredientGroup, UnitOfMeasurement } from '@bar-manager/api';
import { createReducer, on } from '@ngrx/store';

import { HttpErrorResponse } from '@angular/common/http';
import * as IngredientGroupActions from './ingredient-group.actions';
import * as IngredientsActions from '../ingredients/ingredients.actions';
import * as OrdersActions from '../orders/orders.actions';
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
    ingredientGroups: state.ingredientGroups.filter(
      ingredientGroup => ingredientGroup.ingredientGroupId !== action.ingredientGroupId
    ),
  })),
  on(IngredientsActions.deleteIngredientSuccess, (state, action) => ({
    ...state,
    loading: false,
    selectedIngredientGroup: {
      ingredientGroupId: state.selectedIngredientGroup?.ingredientGroupId || '',
      ingredientGroupName: state.selectedIngredientGroup?.ingredientGroupName || '',
      unitOfMeasurement: state.selectedIngredientGroup?.unitOfMeasurement || UnitOfMeasurement.ML,
      ingredients: state.selectedIngredientGroup?.ingredients?.filter(
        ingredient => ingredient.ingredientId !== action.ingredientId
      ),
    },
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
      return ingredientGroup.ingredientGroupId === action.ingredientGroup.ingredientGroupId
        ? action.ingredientGroup
        : ingredientGroup;
    }),
  })),
  on(IngredientGroupActions.editIngredientGroupFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
  })),

  on(IngredientGroupActions.selectSingleIngredientGroup, (state, action) => ({
    ...state,
    selectedIngredientGroup: state.ingredientGroups.find(value => value.ingredientGroupId === action.ingredientGroupId),
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
