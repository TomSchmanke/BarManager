import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { Order } from 'src/app/util/api/models/orders';

import * as OrdersActions from './orders.actions';

export const featureKey = 'orders';

export interface IState {
  orders: {
    content: Order[];
    loading: boolean;
    error?: HttpErrorResponse;
  };
  modifyOrder: {
    orderId?: number;
    mode: 'accept' | 'decline' | 'none';
    loading: boolean;
    error?: HttpErrorResponse;
  };
  selectedOrder?: Order;
}

export const initialState: IState = {
  orders: {
    content: [],
    loading: false,
    error: undefined,
  },
  modifyOrder: {
    orderId: undefined,
    mode: 'none',
    loading: false,
    error: undefined,
  },
  selectedOrder: undefined,
};

export const reducer = createReducer(
  initialState,

  on(OrdersActions.loadOrders, state => ({
    ...state,
    orders: {
      ...state.orders,
      loading: true,
      error: undefined,
    },
  })),
  on(OrdersActions.loadOrdersSuccess, (state, action) => ({
    ...state,
    orders: {
      ...state.orders,
      content: action.orders,
      loading: false,
    },
  })),
  on(OrdersActions.loadOrdersFailure, (state, action) => ({
    ...state,
    orders: {
      ...state.orders,
      content: [],
      loading: false,
      error: action.error,
    },
  })),

  on(OrdersActions.selectSingleOrder, (state, action) => ({
    ...state,
    selectedOrder: state.orders.content.find(value => value.id === action.orderId),
  })),
  on(OrdersActions.resetSelectSingleOrder, state => ({
    ...state,
    selectedOrder: undefined,
  })),

  on(OrdersActions.acceptSingleOrder, (state, action) => ({
    ...state,
    modifyOrder: {
      ...state.modifyOrder,
      orderId: action.orderId,
      mode: 'accept',
      loading: true,
      error: undefined,
    },
  })),
  on(OrdersActions.acceptSingleOrderSuccess, (state, action) => ({
    ...state,
    modifyOrder: {
      ...state.modifyOrder,
      loading: false,
    },
  })),
  on(OrdersActions.acceptSingleOrderFailure, (state, action) => ({
    ...state,
    orders: {
      ...state.orders,
      content: [],
      loading: false,
      error: action.response,
    },
  }))
);