import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UnitOfMeasurement } from 'src/app/shared/models/unit-of-measurement';
import { loadIngredients, loadIngredientsSuccess } from 'src/app/store/ingredients/ingredients.actions';
import { selectShowIngredientsContent } from 'src/app/store/ingredients/ingredients.selectors';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent {

  unitOfMeasurement = UnitOfMeasurement;
  
  ingredientGroup$: Observable<any>;

  constructor(
    private readonly store: Store
  ) {
    this.store.dispatch(loadIngredients());
    this.store.dispatch(loadIngredientsSuccess({ingredients: [
      {
        id: '1',
        name: 'Gin',
        unitOfMeasurement: UnitOfMeasurement.ML,
        ingredients: [
          {
            id: '1',
            name: 'Gin de Cologne',
            description: '',
            ammount: 700
          },
          {
            id: '2',
            name: 'Gin de Cologne - Orange',
            description: 'Jummy Orange',
            ammount: 700
          },
          {
            id: '3',
            name: 'Bombay Saphire',
            ammount: 0
          },
        ]
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
            ammount: 0
          },
          {
            id: '2',
            name: 'Wodka Grobatschow',
            description: '',
            ammount: 0
          },
        ]
      }
    ]}))
    this.ingredientGroup$ = this.store.select(selectShowIngredientsContent);
  }

  selectIngredientGroup(ingredientGroupId: string) {
    console.log('Select ingredient group', ingredientGroupId);
  }

}
