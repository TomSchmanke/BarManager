import * as fromBarReducer from './bar.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectBarState = createFeatureSelector<fromBarReducer.IState>(fromBarReducer.featureKey);

export const selectBarContent = createSelector(selectBarState, state => state.bar);
export const selectBarLoadingStatus = createSelector(selectBarState, state => state.loading);
