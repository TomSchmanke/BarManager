import { HttpErrorResponse } from '@angular/common/http';
import { Order } from '@bar-manager/api';
import { createReducer, on } from '@ngrx/store';

import * as OrdersActions from './orders.actions';

export const featureKey = 'orders';

export interface OrderState {
  orders: {
    content: Order[];
    loading: boolean;
    error?: HttpErrorResponse;
  };
  modifyOrder: {
    orderId?: string;
    mode: 'accept' | 'decline' | 'none';
    loading: boolean;
    error?: HttpErrorResponse;
  };
  selectedOrder?: Order;
}

export const initialState: OrderState = {
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
    selectedOrder: state.orders.content.find(value => value.orderId === action.orderId),
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
    orders: {
      content: state.orders.content.filter(orders => orders.orderId !== action.orderId),
      loading: false,
    },
    modifyOrder: {
      ...state.modifyOrder,
      loading: false,
    },
  })),
  on(OrdersActions.acceptSingleOrderFailure, (state, action) => ({
    ...state,
    orders: {
      content: [],
      loading: false,
      error: action.error,
    },
  })),
  on(OrdersActions.declineSingleOrderSuccess, (state, action) => ({
    ...state,
    orders: {
      content: state.orders.content.filter(orders => orders.orderId !== action.orderId),
      loading: false,
    },
    modifyOrder: {
      ...state.modifyOrder,
      loading: false,
    },
  })),
  on(OrdersActions.declineSingleOrderFailure, (state, action) => ({
    ...state,
    orders: {
      ...state.orders,
      content: [],
      loading: false,
      error: action.error,
    },
  }))
);
