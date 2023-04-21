import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadOrders, loadOrdersSuccess, selectSingleOrder } from 'src/app/store/orders/orders.actions';
import { selectOrderContent } from 'src/app/store/orders/orders.selectors';
import { Order } from 'src/app/util/api/models/orders';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  orders$: Observable<Order[]>;

  constructor(private readonly store: Store) {
    this.store.dispatch(loadOrders());
    this.store.dispatch(
      loadOrdersSuccess({
        orders: [
          {
            id: 1,
            name: 'Tom',
            dateOfOrder: Date.now(),
            cocktail: {
              id: 1,
              ingredients: [],
              name: 'Gin Tonic',
            },
          },
        ],
      })
    );
    this.orders$ = this.store.select(selectOrderContent);
  }

  selectOrder(orderId: number) {
    this.store.dispatch(selectSingleOrder({ orderId }));
  }
}
