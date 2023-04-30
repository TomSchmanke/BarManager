import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromIngredientsReducer from './ingredients.reducers';

export const selectIngredientsState = createFeatureSelector<fromIngredientsReducer.IngredientState>(
  fromIngredientsReducer.featureKey
);

export const selectIngredientsContent = createSelector(selectIngredientsState, state => state.ingredients);

export const selectSelectedIngredient = createSelector(selectIngredientsState, state => state.selectedIngredient);
export const selectIngredientsLoadingStatus = createSelector(selectIngredientsState, state => state.loading);
