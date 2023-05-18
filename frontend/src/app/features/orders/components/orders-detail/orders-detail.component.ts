import { Component } from '@angular/core';
import { Cocktail, Order, UnitOfMeasurement } from '@bar-manager/api';
import { Store } from '@ngrx/store';
import { Observable, delay, filter, from, of, switchMap } from 'rxjs';
import { selectSelectedOrder } from 'src/app/store/orders/orders.selectors';
import { loadCocktail } from 'src/app/store/recipes/cocktails.actions';
import {
  selectSelectedCocktail,
  selectSelectedCocktailsLoadingStatus,
} from 'src/app/store/recipes/cocktails.selectors';

@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.css'],
})
export class OrdersDetailComponent {
  loading$: Observable<boolean>;
  currentlySelectedOrder$: Observable<Order | undefined>;
  currentlySelectedCocktail$: Observable<Cocktail | undefined>;

  constructor(private store: Store) {
    this.loading$ = this.store.select(selectSelectedCocktailsLoadingStatus);
    this.currentlySelectedOrder$ = this.store.select(selectSelectedOrder);
    this.currentlySelectedCocktail$ = this.store.select(selectSelectedCocktail);
    this.currentlySelectedOrder$
      .pipe(
        filter(order => order !== undefined),
        switchMap(order => of(this.store.dispatch(loadCocktail({ cocktailId: order!.cocktailId }))))
      )
      .subscribe();
  }
}
