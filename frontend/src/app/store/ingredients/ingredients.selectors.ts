import * as fromIngredientsReducer from './ingredients.reducers'
import { createFeatureSelector, createSelector } from '@ngrx/store';
  
export const selectIngredientsState = createFeatureSelector<fromIngredientsReducer.IState>(
  fromIngredientsReducer.featureKey
);

export const selectIngredientsContent = createSelector(selectIngredientsState, (state) => state.ingredients)
export const selectIngredientsLoadingStatus = createSelector(selectIngredientsState, (state) => state.loading)