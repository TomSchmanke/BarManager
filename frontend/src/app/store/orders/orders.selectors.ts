import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromOrdersReducer from './orders.reducers';

export const selectOrdersState = createFeatureSelector<fromOrdersReducer.IState>(fromOrdersReducer.featureKey);

export const selectOrderContent = createSelector(selectOrdersState, state => state.orders);
export const selectSelectedOrder = createSelector(selectOrdersState, state => state.selectedOrder);
//export const selectOrdersLoadingStatus = createSelector(selectOrdersState, state => state.loading);
