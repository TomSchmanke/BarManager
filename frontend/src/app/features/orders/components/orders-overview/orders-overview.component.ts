import { Component } from '@angular/core';
import { Order } from '@bar-manager/api';
import { Store } from '@ngrx/store';
import { Observable, delay, from, of } from 'rxjs';
import { declineSingleOrder, selectSingleOrder } from 'src/app/store/orders/orders.actions';
import { selectOrderContent, selectOrdersLoadingStatus } from 'src/app/store/orders/orders.selectors';

@Component({
  selector: 'app-orders-overview',
  templateUrl: './orders-overview.component.html',
  styleUrls: ['./orders-overview.component.css'],
})
export class OrdersOverviewComponent {
  loading$: Observable<boolean>;
  orders$: Observable<Order[]>;
  orderToDelete?: number;

  constructor(private readonly store: Store) {
    this.loading$ = this.store.select(selectOrdersLoadingStatus);
    // ToDo: Remove mock data
    this.loading$ = from([true, false]).pipe(delay(3000));

    this.orders$ = this.store.select(selectOrderContent);
    // ToDo: Remove mock data
    this.orders$ = of([
      {
        cocktailId: 1,
        cocktailName: 'Mojito',
        customerName: 'Tom Schmanke',
        orderId: 1,
        timestamp: '27. Februar 2001  - 15:00:00',
      },
      {
        cocktailId: 2,
        cocktailName: 'Gin Tonic',
        customerName: 'Tom',
        orderId: 2,
        timestamp: '27. Februar 2001  - 14:30:00',
      },
      {
        cocktailId: 1,
        cocktailName: 'Sex on the beach',
        customerName: 'Tom Alexander Schmanke',
        orderId: 3,
        timestamp: '27. Februar 2001 - 14:00:00',
      },
    ]);
  }

  selectOrder(orderId: number) {
    this.store.dispatch(selectSingleOrder({ orderId }));
  }

  openAcceptOrderModal(orderId: number) {}

  openDeclineOrderModal(orderId: number) {
    this.orderToDelete = orderId;
  }

  cancelDeclineOrderModal() {
    this.orderToDelete = undefined;
  }

  confirmDeclineOrderModal() {
    // ToDo: Get barId from bar store
    this.store.dispatch(declineSingleOrder({ barId: 5, orderId: this.orderToDelete! }));
    this.orderToDelete = undefined;
  }
}
