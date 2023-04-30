import { Component } from '@angular/core';
import { Ingredient, IngredientGroup, UnitOfMeasurement } from '@bar-manager/api';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import {
  deleteIngredientGroup,
  loadIngredientGroups,
  selectSingleIngredientGroup,
} from 'src/app/store/ingredient-group/ingredient-group.actions';
import { deleteIngredient, selectSingleIngredient } from 'src/app/store/ingredients/ingredients.actions';
import {
  selectSelectedIngredientGroup,
  selectShowIngredientsContent,
} from 'src/app/store/ingredient-group/ingredient-group.selectors';

@Component({
  selector: 'app-ingredients-overview',
  templateUrl: './ingredients-overview.component.html',
  styleUrls: ['./ingredients-overview.component.css'],
})
export class IngredientsOverviewComponent {
  unitOfMeasurement = UnitOfMeasurement;

  ingredientGroup$: Observable<IngredientGroup[]>;
  selectedIngredientGroup$: Observable<Ingredient[] | undefined>;

  ingredientGroupToDeleteId?: number;
  ingredientToDeleteId?: number;

  constructor(private readonly store: Store) {
    this.store.dispatch(loadIngredientGroups());
    this.ingredientGroup$ = this.store.select(selectShowIngredientsContent);
    this.selectedIngredientGroup$ = this.store
      .select(selectSelectedIngredientGroup)
      .pipe(map(value => (value ? value.ingredients : undefined)));
  }

  selectIngredientGroup(ingredientGroupId: number) {
    this.store.dispatch(selectSingleIngredientGroup({ ingredientGroupId }));
    console.log('Select ingredient group', ingredientGroupId);
  }

  // Edit ingredient group and ingredient

  editIngredientGroup(ingredientGroupId: number) {
    this.store.dispatch(selectSingleIngredientGroup({ ingredientGroupId }));
  }

  editIngredient(ingredientId: number) {
    this.store.dispatch(selectSingleIngredient({ ingredientId }));
  }

  // Add ingredient group and ingredient

  addIngredientGroup() {
    this.store.dispatch(selectSingleIngredientGroup({ ingredientGroupId: undefined }));
  }

  addIngredient() {
    this.store.dispatch(selectSingleIngredient({ ingredientId: undefined }));
  }

  // Delete ingredient group

  openDeleteIngredientGroupModal(ingredientGroupId: number) {
    this.ingredientGroupToDeleteId = ingredientGroupId;
  }

  confirmDeleteIngredientGroup() {
    this.store.dispatch(
      deleteIngredientGroup({
        ingredientGroupId: this.ingredientGroupToDeleteId!,
      })
    );
    this.ingredientGroupToDeleteId = undefined;
  }

  cancelDeleteIngredientGroup() {
    this.ingredientGroupToDeleteId = undefined;
  }

  // Delete ingredient

  openDeleteIngredientModal(ingredientId: number) {
    this.ingredientToDeleteId = ingredientId;
  }

  confirmDeleteIngredient() {
    this.store.dispatch(deleteIngredient({ ingredientId: this.ingredientToDeleteId! }));
    this.ingredientToDeleteId = undefined;
  }

  cancelDeleteIngredient() {
    this.ingredientToDeleteId = undefined;
  }
}
