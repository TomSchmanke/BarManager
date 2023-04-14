import * as fromIngredientsReducer from './ingredients.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectIngredientsState =
  createFeatureSelector<fromIngredientsReducer.IState>(
    fromIngredientsReducer.featureKey
  );

export const selectIngredientsContent = createSelector(
  selectIngredientsState,
  (state) => state.ingredients
);
export const selectShowIngredientsContent = createSelector(
  selectIngredientsState,
  (state) => state.shownIngredients
);
export const selectSelectedIngredientGroup = createSelector(
  selectIngredientsState,
  (state) => state.selectedIngredientGroup
);
export const selectSelectedIngredient = createSelector(
  selectIngredientsState,
  (state) => state.selectedIngredient
);
export const selectIngredientsLoadingStatus = createSelector(
  selectIngredientsState,
  (state) => state.loading
);
