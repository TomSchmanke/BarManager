import { Component, OnInit, inject } from '@angular/core';
import { Order } from '@bar-manager/api';
import { Store } from '@ngrx/store';
import { Observable, delay, from, of, take } from 'rxjs';
import { selectBarId } from 'src/app/store/bar/bar.selectors';
import { declineSingleOrder, selectSingleOrder } from 'src/app/store/orders/orders.actions';
import { selectOrderContent, selectOrdersLoadingStatus } from 'src/app/store/orders/orders.selectors';

@Component({
  selector: 'app-orders-overview',
  templateUrl: './orders-overview.component.html',
  styleUrls: ['./orders-overview.component.css'],
})
export class OrdersOverviewComponent {
  private store = inject(Store);
  loading$: Observable<boolean> = this.store.select(selectOrdersLoadingStatus);
  orders$: Observable<Order[]> = this.store.select(selectOrderContent);
  orderToDelete?: number;
  private barId$: Observable<number | undefined> = this.store.select(selectBarId);

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
    this.store.dispatch(declineSingleOrder({ barId: 1, orderId: this.orderToDelete! }));
    this.orderToDelete = undefined;
  }
}
