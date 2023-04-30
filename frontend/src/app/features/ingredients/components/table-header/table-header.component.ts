import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  showAvailableIngredientsGroups,
  showUnavailableIngredientsGroups,
  showAllIngredientsGroups,
} from 'src/app/store/ingredient-group/ingredient-group.actions';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.css'],
})
export class TableHeaderComponent {
  constructor(private readonly store: Store) {}

  filterMasterView(filter: 'all' | 'available' | 'unavailable') {
    if (filter === 'available') {
      this.store.dispatch(showAvailableIngredientsGroups());
    } else if (filter === 'unavailable') {
      this.store.dispatch(showUnavailableIngredientsGroups());
    } else {
      this.store.dispatch(showAllIngredientsGroups());
    }
  }

  addIngredientClass() {
    console.log('Add ingredient');
  }
}
