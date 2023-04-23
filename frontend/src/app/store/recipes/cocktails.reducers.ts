import { createReducer, on } from '@ngrx/store';
import * as CocktailActions from './cocktails.actions';
import { Cocktail } from '@bar-manager/api';
import { HttpErrorResponse } from '@angular/common/http';

export const featureKey = 'cocktails';

export interface IState {
  selectedCocktail: {
    cocktail?: Cocktail;
    loading: boolean;
    error?: HttpErrorResponse;
  };
}

export const initialState: IState = {
  selectedCocktail: {
    cocktail: undefined,
    loading: false,
    error: undefined,
  },
};

export const reducer = createReducer(
  initialState,
  on(CocktailActions.loadSingleCocktail, state => ({
    ...state,
    selectedCocktail: { ...state.selectedCocktail, cocktail: undefined, loading: true },
  })),
  on(CocktailActions.loadSingleCocktailSuccess, (state, action) => ({
    ...state,
    selectedCocktail: { ...state.selectedCocktail, cocktail: action.cocktail, loading: false },
  })),
  on(CocktailActions.loadSingleCocktailFailure, (state, action) => ({
    ...state,
    selectedCocktail: { ...state.selectedCocktail, error: action.error, loading: false },
  }))
);
