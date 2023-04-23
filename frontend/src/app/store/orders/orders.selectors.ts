import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromOrdersReducer from './orders.reducers';

export const selectOrdersState = createFeatureSelector<fromOrdersReducer.IState>(fromOrdersReducer.featureKey);

export const selectOrderContent = createSelector(selectOrdersState, state => state.orders.content);
export const selectOrdersLoadingStatus = createSelector(selectOrdersState, state => state.orders.loading);
export const selectOrdersError = createSelector(selectOrdersState, state => state.orders.error);

export const selectSelectedOrder = createSelector(selectOrdersState, state => state.selectedOrder);

export const selectModifyOrderId = createSelector(selectOrdersState, state => state.modifyOrder.orderId);
export const selectModifyOrderMode = createSelector(selectOrdersState, state => state.modifyOrder.mode);
export const selectModifyOrderLoading = createSelector(selectOrdersState, state => state.modifyOrder.loading);
export const selectModifyOrderError = createSelector(selectOrdersState, state => state.modifyOrder.error);
