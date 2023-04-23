import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadOrders } from 'src/app/store/orders/orders.actions';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  constructor(private readonly store: Store) {
    // ToDo: Get barId from bar store
    this.store.dispatch(loadOrders({ barId: 5 }));
  }
}
