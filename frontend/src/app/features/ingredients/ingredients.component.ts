import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Ingredient, IngredientGroup } from 'src/app/shared/models/ingredients';
import { UnitOfMeasurement } from 'src/app/shared/models/unit-of-measurement';
import {
  deleteIngredient,
  deleteIngredientGroup,
  editIngredient,
  editIngredientGroup,
  loadIngredients,
  loadIngredientsSuccess,
  selectSingleIngredientGroup,
} from 'src/app/store/ingredients/ingredients.actions';
import {
  selectSelectedIngredientGroup,
  selectShowIngredientsContent,
} from 'src/app/store/ingredients/ingredients.selectors';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css'],
})
export class IngredientsComponent {
  unitOfMeasurement = UnitOfMeasurement;

  ingredientGroup$: Observable<IngredientGroup[]>;
  selectedIngredientGroup$: Observable<Ingredient[] | undefined>;

  constructor(private readonly store: Store) {
    this.store.dispatch(loadIngredients());
    this.store.dispatch(
      loadIngredientsSuccess({
        ingredients: [
          {
            id: '1',
            name: 'Gin',
            unitOfMeasurement: UnitOfMeasurement.ML,
            ingredients: [
              {
                id: '1',
                name: 'Gin de Cologne',
                description: '',
                ammount: 700,
              },
              {
                id: '2',
                name: 'Gin de Cologne - Orange',
                description: 'Jummy Orange',
                ammount: 700,
              },
              {
                id: '3',
                name: 'Bombay Saphire',
                ammount: 0,
              },
            ],
          },
          {
            id: '2',
            name: 'Wodka',
            unitOfMeasurement: UnitOfMeasurement.ML,
            ingredients: [
              {
                id: '4',
                name: 'Absolut Wodka',
                description: '',
                ammount: 0,
              },
              {
                id: '2',
                name: 'Wodka Grobatschow',
                description: '',
                ammount: 0,
              },
            ],
          },
        ],
      })
    );
    this.ingredientGroup$ = this.store.select(selectShowIngredientsContent);
    this.selectedIngredientGroup$ = this.store
      .select(selectSelectedIngredientGroup)
      .pipe(map((value) => (value ? value.ingredients : undefined)));
  }

  selectIngredientGroup(ingredientGroupId: string) {
    this.store.dispatch(selectSingleIngredientGroup({ ingredientGroupId }));
    console.log('Select ingredient group', ingredientGroupId);
  }

  editIngredientGroup(ingredientGroupId: string) {
    this.store.dispatch(editIngredientGroup({ ingredientGroupId }));
    console.log('Edit ingredient group', ingredientGroupId);
  }

  deleteIngredientGroup(ingredientGroupId: string) {
    this.store.dispatch(deleteIngredientGroup({ ingredientGroupId }));
    console.log('Delete ingredient group', ingredientGroupId);
  }

  editIngredient(ingredientId: string) {
    this.store.dispatch(editIngredient({ ingredientId }));
    console.log('Edit ingredient', ingredientId);
  }

  deleteIngredient(ingredientId: string) {
    this.store.dispatch(deleteIngredient({ ingredientId }));
    console.log('Delete ingredient', ingredientId);
  }
}
