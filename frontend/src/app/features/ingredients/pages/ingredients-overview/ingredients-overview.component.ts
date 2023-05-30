import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { resetSelectSingleIngredientGroup } from 'src/app/store/ingredient-group/ingredient-group.actions';

@Component({
  selector: 'app-ingredients-overview',
  templateUrl: './ingredients-overview.component.html',
  styleUrls: ['./ingredients-overview.component.css'],
})
export class IngredientsOverviewComponent implements OnInit {
  private store = inject(Store);
  ngOnInit(): void {
    this.store.dispatch(resetSelectSingleIngredientGroup());
  }
}
