import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCocktailsReducer from './cocktails.reducers';

export const selectCocktailState = createFeatureSelector<fromCocktailsReducer.CocktailState>(
  fromCocktailsReducer.featureKey
);

export const selectCocktailContent = createSelector(selectCocktailState, state => state.cocktails);
export const selectSelectedCocktail = createSelector(selectCocktailState, state => state.selectedCocktail);
export const selectSelectedCocktailsLoadingStatus = createSelector(selectCocktailState, state => state.loading);
export const selectSelectedCocktailsError = createSelector(selectCocktailState, state => state.error);
