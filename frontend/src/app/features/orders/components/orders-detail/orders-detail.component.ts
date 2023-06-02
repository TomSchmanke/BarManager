import { Component, OnInit, inject } from '@angular/core';
import { Cocktail, Order, UnitOfMeasurement } from '@bar-manager/api';
import { Store } from '@ngrx/store';
import { Observable, Subscription, delay, filter, from, of, switchMap } from 'rxjs';
import { selectSelectedOrder } from 'src/app/store/orders/orders.selectors';
import { loadCocktail, resetSelectedCocktail } from 'src/app/store/recipes/cocktails.actions';
import {
  selectSelectedCocktail,
  selectSelectedCocktailsLoadingStatus,
} from 'src/app/store/recipes/cocktails.selectors';

@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.css'],
})
export class OrdersDetailComponent implements OnInit {
  private store = inject(Store);
  loading$: Observable<boolean> = this.store.select(selectSelectedCocktailsLoadingStatus);
  currentlySelectedOrder$: Observable<Order | undefined> = this.store.select(selectSelectedOrder);
  currentlySelectedCocktail$: Observable<Cocktail | undefined> = this.store.select(selectSelectedCocktail);
  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.store.dispatch(resetSelectedCocktail());
    this.subscriptions.add(
      this.currentlySelectedOrder$
        .pipe(
          filter(order => order !== undefined),
          switchMap(order => of(this.store.dispatch(loadCocktail({ cocktailId: order!.cocktailId }))))
        )
        .subscribe()
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
