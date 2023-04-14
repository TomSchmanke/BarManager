import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { first } from 'rxjs';
import { Ingredient, IngredientGroup, UnitOfMeasurement } from '@bar-manager/api';
import { addIngredientGroup, editIngredientGroup } from 'src/app/store/ingredients/ingredients.actions';
import { selectSelectedIngredientGroup } from 'src/app/store/ingredients/ingredients.selectors';

@Component({
  selector: 'app-ingredients-group-edit',
  templateUrl: './ingredients-group-edit.component.html',
  styleUrls: ['./ingredients-group-edit.component.css'],
})
export class IngredientsGroupEditComponent {
  uOfMKeys = Object.keys(UnitOfMeasurement);
  unitOfMeasurement = this.uOfMKeys.slice(this.uOfMKeys.length / 2, this.uOfMKeys.length);

  newOrExisitingIngredientGroup?: 'new' | 'existing';
  ingredientsGroupEditForm?: FormGroup;
  selectedIngredientGroupIngredients?: Ingredient[] = [];

  constructor(private store: Store, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.ingredientsGroupEditForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      unitOfMeasurement: [0, [Validators.required]],
    });

    this.store
      .select(selectSelectedIngredientGroup)
      .pipe(first())
      .subscribe(ingredientGroup => {
        this.newOrExisitingIngredientGroup = ingredientGroup ? 'existing' : 'new';
        if (this.newOrExisitingIngredientGroup === 'existing') {
          this.ingredientsGroupEditForm?.setValue({
            name: ingredientGroup?.name ? ingredientGroup.name : '',
            unitOfMeasurement: ingredientGroup?.unitOfMeasurement
              ? ingredientGroup.unitOfMeasurement
              : UnitOfMeasurement.G,
          });
          this.selectedIngredientGroupIngredients = ingredientGroup?.ingredients;
        }
      });
  }

  onSubmit() {
    const newIngredientGroup: IngredientGroup = {
      id: 0,
      name: this.ingredientsGroupEditForm?.get('name')?.value,
      unitOfMeasurement: this.ingredientsGroupEditForm?.get('unitOfMeasurement')?.value,
      ingredients: this.selectedIngredientGroupIngredients!,
    };
    if (this.newOrExisitingIngredientGroup === 'existing') {
      this.store.dispatch(editIngredientGroup({ ingredientGroup: newIngredientGroup }));
    } else {
      this.store.dispatch(addIngredientGroup({ ingredientGroup: newIngredientGroup }));
    }
  }
}
