import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Order } from 'src/app/util/api/models/orders';

export const loadOrders = createAction('[orders] load orders');
export const loadOrdersSuccess = createAction('[orders] load orders success', props<{ orders: Order[] }>());
export const loadOrdersFailure = createAction('[orders] load orders failure', props<{ error: HttpErrorResponse }>());

export const selectSingleOrder = createAction('[orders] select single order', props<{ orderId?: number }>());
export const resetSelectSingleOrder = createAction('[orders] reset select single order');

export const acceptSingleOrder = createAction('[orders] accept single order', props<{ orderId: number }>());
export const acceptSingleOrderSuccess = createAction(
  '[orders] accept single order',
  props<{ response: HttpStatusCode }>()
);
export const acceptSingleOrderFailure = createAction(
  '[orders] accept single order',
  props<{ response: HttpErrorResponse }>()
);

export const declineSingleOrder = createAction('[orders] decline single order', props<{ orderId: number }>());
export const declineSingleOrderSuccess = createAction(
  '[orders] decline single order',
  props<{ response: HttpStatusCode }>()
);
export const declineSingleOrderFailure = createAction(
  '[orders] decline single order',
  props<{ response: HttpErrorResponse }>()
);
