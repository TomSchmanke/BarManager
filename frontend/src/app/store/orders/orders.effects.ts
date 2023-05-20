import { Injectable, inject } from '@angular/core';
import { OrdersService } from '@bar-manager/api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, catchError, map, of, switchMap, withLatestFrom } from 'rxjs';

import * as fromOrdersActions from './orders.actions';
import { Store, select } from '@ngrx/store';
import { selectBarId } from '../bar/bar.selectors';

@Injectable()
export class OrdersEffects {
  private store = inject(Store);

  private loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOrdersActions.loadOrders),
      withLatestFrom(this.store.select(selectBarId)),
      switchMap(([action, barId]) =>
        this.ordersService.getOrders({ 'bar-id': barId }).pipe(
          map(orders => fromOrdersActions.loadOrdersSuccess({ orders: orders })),
          catchError(error => of(fromOrdersActions.loadOrdersFailure({ error })))
        )
      )
    )
  );
  private addOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOrdersActions.addOrder),
      withLatestFrom(this.store.select(selectBarId)),
      switchMap(([action, barId]) =>
        this.ordersService.postOrder({ 'bar-id': barId, body: action.order as any }).pipe(
          map(order => fromOrdersActions.addOrderSuccess({ order: order })),
          catchError(error => of(fromOrdersActions.addOrderFailure({ error })))
        )
      )
    )
  );

  private acceptOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOrdersActions.acceptSingleOrder),
      withLatestFrom(this.store.select(selectBarId)),
      switchMap(([action, barId]) =>
        this.ordersService.deleteOrder({ 'bar-id': barId, 'order-id': action.orderId }).pipe(
          map(() => fromOrdersActions.acceptSingleOrderSuccess({ orderId: action.orderId })),
          catchError(error => of(fromOrdersActions.acceptSingleOrderFailure({ error: error })))
        )
      )
    )
  );

  private declineOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOrdersActions.declineSingleOrder),
      withLatestFrom(this.store.select(selectBarId)),
      switchMap(([action, barId]) =>
        this.ordersService.deleteOrder({ 'bar-id': barId, 'order-id': action.orderId }).pipe(
          map(() => fromOrdersActions.declineSingleOrderSuccess({ orderId: action.orderId })),
          catchError(error => of(fromOrdersActions.declineSingleOrderFailure({ error: error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private ordersService: OrdersService) {}
}
