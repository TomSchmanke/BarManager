import { Component, inject } from '@angular/core';
import { Order } from '@bar-manager/api';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
  orderToDelete?: string;

  selectOrder(orderId: string) {
    this.store.dispatch(selectSingleOrder({ orderId }));
  }

  openAcceptOrderModal(orderId: string) {}

  openDeclineOrderModal(orderId: string) {
    this.orderToDelete = orderId;
  }

  cancelDeclineOrderModal() {
    this.orderToDelete = undefined;
  }

  confirmDeclineOrderModal() {
    this.store.dispatch(declineSingleOrder({ orderId: this.orderToDelete! }));
    this.orderToDelete = undefined;
  }
}
