import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { showAllIngredientsGroups } from 'src/app/store/ingredients/ingredients.actions';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeaderComponent {
  private readonly store = Inject(Store);
  filterMasterView(filter: 'all' | 'available' | 'unavailable') {
    if (filter === 'available') {
      // this.store.dispatch(());
    } else if (filter === 'unavailable') {
      // this.store.dispatch(());
    } else {
      // this.store.dispatch(());
    }
  }

  addIngredientClass() {
    console.log('Add ingredient');
  }
}
