import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCocktailsReducer from './cocktails.reducers';

export const selectCocktailState = createFeatureSelector<fromCocktailsReducer.IState>(fromCocktailsReducer.featureKey);

export const selectSelectedCocktail = createSelector(selectCocktailState, state => state.selectedCocktail.cocktail);
export const selectSelectedCocktailsLoadingStatus = createSelector(
  selectCocktailState,
  state => state.selectedCocktail.loading
);
export const selectSelectedCocktailsError = createSelector(selectCocktailState, state => state.selectedCocktail.error);
