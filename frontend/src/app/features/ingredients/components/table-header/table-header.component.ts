import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { showAllIngredients, showAvailableIngredients, showUnavailableIngredients } from 'src/app/store/ingredients/ingredients.actions';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.css']
})
export class TableHeaderComponent {

  constructor(
    private readonly store: Store
  ) { }

  filterMasterView(filter: 'all' | 'available' | 'unavailable') {    
    if (filter === 'available') {
      this.store.dispatch(showAvailableIngredients());
    } else if (filter === 'unavailable') {
      this.store.dispatch(showUnavailableIngredients());
    } else {
      this.store.dispatch(showAllIngredients());
    }
  }

  addIngredientClass() {
    console.log("Add ingredient");
  }

}
