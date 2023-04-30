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
        this.ordersService.getOrders$Response({ 'bar-id': barId }).pipe(
          map(orders => fromOrdersActions.loadOrdersSuccess({ orders: orders.body })),
          catchError(error => of(fromOrdersActions.loadOrdersFailure({ error })))
        )
      )
    )
  );

  private acceptOrder$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromOrdersActions.acceptSingleOrder),
        withLatestFrom(this.store.select(selectBarId)),
        switchMap(([action, barId]) =>
          this.ordersService.deleteOrder$Response({ 'bar-id': barId, 'order-id': action.orderId }).pipe(
            map(() => fromOrdersActions.acceptSingleOrderSuccess()),
            catchError(error => of(fromOrdersActions.acceptSingleOrderFailure({ response: error })))
          )
        )
      ),
    { dispatch: false }
  );

  private declineOrder$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromOrdersActions.declineSingleOrder),
        withLatestFrom(this.store.select(selectBarId)),
        switchMap(([action, barId]) =>
          this.ordersService.deleteOrder({ 'bar-id': barId, 'order-id': action.orderId }).pipe(
            map(() => fromOrdersActions.declineSingleOrderSuccess()),
            catchError(error => of(fromOrdersActions.declineSingleOrderFailure({ response: error })))
          )
        )
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private ordersService: OrdersService) {}
}
