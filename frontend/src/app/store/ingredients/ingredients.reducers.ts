import { Ingredient, IngredientGroup, IngredientGroupsService } from '@bar-manager/api';
import { createReducer, on } from '@ngrx/store';

import * as IngredientsActions from './ingredients.actions';
import { HttpErrorResponse } from '@angular/common/http';

export const featureKey = 'ingredients';

export interface IngredientState {
  ingredients: Ingredient[];
  selectedIngredient?: Ingredient;
  loading: boolean;
  error?: HttpErrorResponse;
  selectedIngredients: 'all' | 'available' | 'unavailable';
}

export const initialState: IngredientState = {
  ingredients: [],
  selectedIngredient: undefined,
  loading: false,
  selectedIngredients: 'all',
};

export const reducer = createReducer(
  initialState,

  // on(IngredientsActions.showAvailableIngredientsGroups, state => ({
  //   ...state,
  //   selectedIngredients: 'available',
  //   shownIngredients: state.ingredients.filter(
  //     ingredient => ingredient.ingredients.reduce((acc, value) => acc + value.amount, 0) > 0
  //   ),
  // })),
  // on(IngredientsActions.showUnavailableIngredientsGroups, state => ({
  //   ...state,
  //   selectedIngredients: 'unavailable',
  //   shownIngredients: state.ingredients.filter(
  //     ingredient => ingredient.ingredients.reduce((acc, value) => acc + value.amount, 0) === 0
  //   ),
  // })),

  // on(IngredientsActions.selectSingleIngredient, (state, action) => ({
  //   ...state,
  //   selectedIngredient: state.selectedIngredientGroup!.ingredients.find(value => value.id === action.ingredientId),
  // })),
  on(IngredientsActions.resetSelectSingleIngredient, state => ({
    ...state,
    selectedIngredient: undefined,
  })),

  on(IngredientsActions.deleteIngredient, state => ({
    ...state,
    loading: true,
  })),
  on(IngredientsActions.deleteIngredientSuccess, (state, action) => ({
    ...state,
    loading: false,
    ingredients: state.ingredients.filter(ingredient => ingredient.id !== action.ingredientId),
    selectedIngredients: 'all',
  })),
  on(IngredientsActions.deleteIngredientFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
  })),

  on(IngredientsActions.editIngredient, state => ({
    ...state,
    loading: true,
  })),
  on(IngredientsActions.editIngredientSuccess, (state, action) => ({
    ...state,
    loading: false,
    ingredients: state.ingredients.map((ingredient: Ingredient) => {
      return ingredient.id === action.ingredient.id ? action.ingredient : ingredient;
    }),
    selectedIngredients: 'all',
  })),
  on(IngredientsActions.editIngredientFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
  }))
);
