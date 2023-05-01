import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromIngredientsReducer from './ingredient-group.reducers';

export const selectIngredientGroupState = createFeatureSelector<fromIngredientsReducer.IngredientGroupState>(
  fromIngredientsReducer.featureKey
);

export const selectShowIngredientsContent = createSelector(
  selectIngredientGroupState,
  state => state.shownIngredientGroups
);
export const selectSelectedIngredientGroup = createSelector(
  selectIngredientGroupState,
  state => state.selectedIngredientGroup
);
export const selectIngredientGroupLoadingStatus = createSelector(selectIngredientGroupState, state => state.loading);
