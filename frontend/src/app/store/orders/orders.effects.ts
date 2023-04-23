import { Injectable } from '@angular/core';
import { OrdersService } from '@bar-manager/api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import * as fromOrdersActions from './orders.actions';

@Injectable()
export class OrdersEffects {
  private loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOrdersActions.loadOrders),
      switchMap(action =>
        this.ordersService.getOrders$Response({ 'bar-id': action.barId }).pipe(
          map(orders => fromOrdersActions.loadOrdersSuccess({ orders: orders.body })),
          catchError(error => of(fromOrdersActions.loadOrdersFailure({ error })))
        )
      )
    )
  );

  private acceptOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOrdersActions.acceptSingleOrder),
      switchMap(action =>
        this.ordersService.deleteOrder$Response({ 'bar-id': action.barId, 'order-id': action.orderId }).pipe(
          map(() => fromOrdersActions.acceptSingleOrderSuccess()),
          catchError(error => of(fromOrdersActions.acceptSingleOrderFailure({ response: error })))
        )
      )
    )
  );

  private declineOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOrdersActions.declineSingleOrder),
      switchMap(action =>
        this.ordersService.deleteOrder$Response({ 'bar-id': action.barId, 'order-id': action.orderId }).pipe(
          map(() => fromOrdersActions.declineSingleOrderSuccess()),
          catchError(error => of(fromOrdersActions.declineSingleOrderFailure({ response: error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private ordersService: OrdersService) {}
}
