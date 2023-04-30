import { createReducer, on } from '@ngrx/store';
import * as CocktailActions from './cocktails.actions';
import { Cocktail } from '@bar-manager/api';
import { HttpErrorResponse } from '@angular/common/http';

export const featureKey = 'cocktails';

export interface CocktailState {
  selectedCocktail?: Cocktail;
  loading: boolean;
  error?: HttpErrorResponse;
  cocktails: Cocktail[];
}

export const initialState: CocktailState = {
  cocktails: [],
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(CocktailActions.loadCocktails, state => ({
    ...state,
    loading: true,
  })),
  on(CocktailActions.loadCocktailsSuccess, (state, action) => ({
    ...state,
    cocktails: action.cocktails,
    loading: false,
  })),
  on(CocktailActions.loadCocktailsFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
  })),

  on(CocktailActions.loadCocktail, state => ({
    ...state,
    loading: true,
  })),
  on(CocktailActions.loadCocktailSuccess, (state, action) => ({
    ...state,
    selectedCocktail: action.cocktail,
    loading: false,
  })),
  on(CocktailActions.loadCocktailFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
  })),

  on(CocktailActions.editCocktail, state => ({
    ...state,
    loading: true,
  })),
  on(CocktailActions.editCocktailSuccess, (state, action) => ({
    ...state,
    cocktails: state.cocktails.map((cocktail: Cocktail) => {
      return cocktail.id === action.cocktail.id ? action.cocktail : cocktail;
    }),
    loading: false,
  })),
  on(CocktailActions.editCocktailFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
  }))
);
