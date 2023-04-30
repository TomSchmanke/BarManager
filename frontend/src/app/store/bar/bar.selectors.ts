import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBarReducer from './bar.reducers';

export const selectBarState = createFeatureSelector<fromBarReducer.BarState>(fromBarReducer.featureKey);

export const selectBarContent = createSelector(selectBarState, state => state.bar);

export const selectBarId = createSelector(selectBarState, state => state.bar.barId);

export const selectBarLoadingStatus = createSelector(selectBarState, state => state.loading);

export const selectBarError = createSelector(selectBarState, state => state.error);
