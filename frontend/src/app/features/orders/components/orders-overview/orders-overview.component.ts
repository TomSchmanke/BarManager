import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Cocktail, Ingredient, IngredientGroup, Order } from '@bar-manager/api';
import { Store } from '@ngrx/store';
import { Observable, Subscription, combineLatest, first, map, subscribeOn, switchMap, take } from 'rxjs';
import { loadIngredientGroups } from 'src/app/store/ingredient-group/ingredient-group.actions';
import { selectIngredientGroups } from 'src/app/store/ingredient-group/ingredient-group.selectors';
import { loadIngredients, reduceIngredients } from 'src/app/store/ingredients/ingredients.actions';
import { acceptSingleOrder, declineSingleOrder, selectSingleOrder } from 'src/app/store/orders/orders.actions';
import {
  selectOrderContent,
  selectOrdersLoadingStatus,
  selectSelectedOrder,
} from 'src/app/store/orders/orders.selectors';
import { loadCocktail } from 'src/app/store/recipes/cocktails.actions';
import { selectSelectedCocktail } from 'src/app/store/recipes/cocktails.selectors';

@Component({
  selector: 'app-orders-overview',
  templateUrl: './orders-overview.component.html',
  styleUrls: ['./orders-overview.component.css'],
})
export class OrdersOverviewComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  loading$: Observable<boolean> = this.store.select(selectOrdersLoadingStatus);
  orders$: Observable<Order[]> = this.store.select(selectOrderContent);
  orderToDelete?: string;
  orderToAccept?: string;
  ingredientGroupsFiltered: IngredientGroup[] = [];
  cocktail$: Observable<Cocktail | undefined> = this.store.select(selectSelectedCocktail);
  private subscriptions = new Subscription();

  ngOnInit() {
    this.subscriptions.add(
      this.store.select(selectSelectedOrder).subscribe(order => {
        if (order != null) {
          this.store.dispatch(loadCocktail({ cocktailId: order.cocktailId }));
        }
      })
    );
  }

  selectOrder(orderId: string) {
    this.store.dispatch(selectSingleOrder({ orderId }));
  }

  openAcceptOrderModal(orderId: string) {
    this.selectOrder(orderId);

    // Alle IngredientGruppen + Ingredients
    this.store.dispatch(loadIngredientGroups());
    const ingredientGroupPromise = this.store.select(selectIngredientGroups);

    // Cocktail Informationen
    const cocktailPromise = this.store.select(selectSelectedCocktail);

    // Nur die relevanten IngredientGruppen + Ingredients
    this.subscriptions.add(
      combineLatest([ingredientGroupPromise, cocktailPromise])
        .pipe(take(1))
        .subscribe(([ingredientGroups, cocktail]) => {
          this.ingredientGroupsFiltered = [];
          for (const ingredientGroup of ingredientGroups) {
            cocktail!.recipeIngredients!.forEach(recipeIngredient => {
              if (ingredientGroup.ingredientGroupName === recipeIngredient.ingredientGroupName) {
                this.ingredientGroupsFiltered.push(ingredientGroup);
              }
            });
          }

          this.orderToAccept = orderId;
        })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  cancelAcceptOrderModal() {
    this.orderToAccept = undefined;
  }

  confirmAcceptOrderModal(event: Ingredient[]) {
    this.store.dispatch(acceptSingleOrder({ orderId: this.orderToAccept! }));
    this.store.dispatch(reduceIngredients({ ingredients: event }));
    this.orderToDelete = undefined;
  }

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
