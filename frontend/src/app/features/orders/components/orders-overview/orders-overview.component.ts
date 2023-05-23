import { Component, inject } from '@angular/core';
import { Ingredient, IngredientGroup, Order } from '@bar-manager/api';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { loadIngredientGroups } from 'src/app/store/ingredient-group/ingredient-group.actions';
import { selectIngredientGroups } from 'src/app/store/ingredient-group/ingredient-group.selectors';
import { reduceIngredients } from 'src/app/store/ingredients/ingredients.actions';
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
export class OrdersOverviewComponent {
  private store = inject(Store);
  loading$: Observable<boolean> = this.store.select(selectOrdersLoadingStatus);
  orders$: Observable<Order[]> = this.store.select(selectOrderContent);
  orderToDelete?: string;
  orderToAccept?: string;
  ingredientGroupsFiltered: IngredientGroup[] = [];

  selectOrder(orderId: string) {
    this.store.dispatch(selectSingleOrder({ orderId }));
  }

  openAcceptOrderModal(orderId: string) {
    this.selectOrder(orderId);

    // Alle IngredientGruppen + Ingredients
    this.store.dispatch(loadIngredientGroups());
    const ingredientGroupPromise = this.store.select(selectIngredientGroups);

    // Cocktail Informationen
    this.store.select(selectSelectedOrder).subscribe(order => {
      this.store.dispatch(loadCocktail({ cocktailId: order!.cocktailId }));
    });
    const cocktailPromise = this.store.select(selectSelectedCocktail);

    // Nur die relevanten IngredientGruppen + Ingredients
    combineLatest([ingredientGroupPromise, cocktailPromise]).subscribe(([ingredientGroups, cocktail]) => {
      this.ingredientGroupsFiltered = [];
      for (const ingredientGroup of ingredientGroups) {
        cocktail!.recipeIngredients!.forEach(recipeIngredient => {
          if (ingredientGroup.ingredientGroupName === recipeIngredient.ingredientGroupName) {
            this.ingredientGroupsFiltered.push(ingredientGroup);
          }
        });
      }

      this.orderToAccept = orderId;
    });
  }

  cancelAcceptOrderModal() {
    this.orderToAccept = undefined;
  }

  confirmAcceptOrderModal() {
    this.store.dispatch(acceptSingleOrder({ orderId: this.orderToAccept! }));
    const ingredients: Array<Ingredient> = [];
    this.store.dispatch(reduceIngredients({ ingredients: ingredients }));
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
