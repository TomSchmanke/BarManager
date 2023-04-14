import * as fromRecipesReducer from './recipes.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectRecipesState = createFeatureSelector<fromRecipesReducer.IState>(fromRecipesReducer.featureKey);

export const selectRecipesContent = createSelector(selectRecipesState, state => state.recipes);
export const selectRecipesLoadingStatus = createSelector(selectRecipesState, state => state.loading);
