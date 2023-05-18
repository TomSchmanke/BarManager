import { HttpErrorResponse } from '@angular/common/http';
import { Order } from '@bar-manager/api';
import { createAction, props } from '@ngrx/store';

export const loadOrders = createAction('[orders] load orders');
export const loadOrdersSuccess = createAction('[orders] load orders success', props<{ orders: Order[] }>());
export const loadOrdersFailure = createAction('[orders] load orders failure', props<{ error: HttpErrorResponse }>());

export const selectSingleOrder = createAction('[orders] select single order', props<{ orderId?: string }>());
export const resetSelectSingleOrder = createAction('[orders] reset select single order');

export const acceptSingleOrder = createAction('[orders] accept single order', props<{ orderId: string }>());
export const acceptSingleOrderSuccess = createAction('[orders] accept single order', props<{ orderId?: string }>());
export const acceptSingleOrderFailure = createAction(
  '[orders] accept single order',
  props<{ error: HttpErrorResponse }>()
);

export const declineSingleOrder = createAction('[orders] decline single order', props<{ orderId: string }>());
export const declineSingleOrderSuccess = createAction(
  '[orders] decline single order success',
  props<{ orderId?: string }>()
);
export const declineSingleOrderFailure = createAction(
  '[orders] decline single order failure',
  props<{ error: HttpErrorResponse }>()
);
