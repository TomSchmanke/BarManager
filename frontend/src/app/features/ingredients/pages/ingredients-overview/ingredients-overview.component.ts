import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { IngredientGroup, Ingredient, UnitOfMeasurement } from '@bar-manager/api';
import {
  loadIngredients,
  loadIngredientsSuccess,
  selectSingleIngredientGroup,
  editIngredientGroup,
  deleteIngredientGroup,
  editIngredient,
  deleteIngredient,
  selectSingleIngredient,
} from 'src/app/store/ingredients/ingredients.actions';
import {
  selectShowIngredientsContent,
  selectSelectedIngredientGroup,
} from 'src/app/store/ingredients/ingredients.selectors';

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
    this.store.dispatch(loadIngredients());
    this.store.dispatch(
      loadIngredientsSuccess({
        ingredients: [
          {
            id: 1,
            name: 'Gin',
            unitOfMeasurement: UnitOfMeasurement.ML,
            ingredients: [
              {
                id: 1,
                name: 'Gin de Cologne',
                description: '',
                amount: 700,
              },
              {
                id: 2,
                name: 'Gin de Cologne - Orange',
                description: 'Jummy Orange',
                amount: 700,
              },
              {
                id: 3,
                name: 'Bombay Saphire',
                amount: 0,
              },
            ],
          },
          {
            id: 2,
            name: 'Wodka',
            unitOfMeasurement: UnitOfMeasurement.ML,
            ingredients: [
              {
                id: 4,
                name: 'Absolut Wodka',
                description: '',
                amount: 0,
              },
              {
                id: 2,
                name: 'Wodka Grobatschow',
                description: '',
                amount: 0,
              },
            ],
          },
        ],
      })
    );
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
