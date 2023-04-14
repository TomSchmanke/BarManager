import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRecipesReducer from './recipes.reducers';

export const selectRecipesState = createFeatureSelector<fromRecipesReducer.IState>(fromRecipesReducer.featureKey);

export const selectRecipesContent = createSelector(selectRecipesState, state => state.recipes);
export const selectRecipesLoadingStatus = createSelector(selectRecipesState, state => state.loading);
