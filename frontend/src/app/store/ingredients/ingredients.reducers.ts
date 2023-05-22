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
}

export const initialState: IngredientState = {
  ingredients: [],
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(IngredientsActions.loadIngredients, state => ({
    ...state,
    loading: true,
  })),
  on(IngredientsActions.loadIngredientsSuccess, (state, action) => ({
    ...state,
    ingredients: action.ingredients,
    loading: false,
  })),
  on(IngredientsActions.loadIngredientsFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
  })),
  on(IngredientsActions.selectSingleIngredient, (state, action) => ({
    ...state,
    selectedIngredient: state.ingredients.find(value => value.ingredientId === action.ingredientId),
  })),
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
    ingredients: state.ingredients.filter(ingredient => ingredient.ingredientId !== action.ingredientId),
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
      return ingredient.ingredientId === action.ingredient.ingredientId ? action.ingredient : ingredient;
    }),
  })),
  on(IngredientsActions.editIngredientFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
  })),

  on(IngredientsActions.addIngredient, state => ({
    ...state,
    loading: true,
  })),
  on(IngredientsActions.addIngredientSuccess, (state, action) => ({
    ...state,
    loading: false,
    ingredients: [...state.ingredients, action.ingredient],
  })),
  on(IngredientsActions.addIngredientFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
  }))
);
