import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromIngredientsReducer from './ingredient-groups.reducers';

export const selectIngredientGroupState = createFeatureSelector<fromIngredientsReducer.IState>(
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
