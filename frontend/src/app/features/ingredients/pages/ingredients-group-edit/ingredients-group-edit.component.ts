import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ingredient, IngredientGroup, UnitOfMeasurement } from '@bar-manager/api';
import { Store } from '@ngrx/store';
import { first } from 'rxjs';
import { addIngredientGroup, editIngredientGroup } from 'src/app/store/ingredient-group/ingredient-group.actions';
import { selectSelectedIngredientGroup } from 'src/app/store/ingredient-group/ingredient-group.selectors';

@Component({
  selector: 'app-ingredients-group-edit',
  templateUrl: './ingredients-group-edit.component.html',
  styleUrls: ['./ingredients-group-edit.component.css'],
})
export class IngredientsGroupEditComponent {
  unitOfMeasurement = Object.keys(UnitOfMeasurement);

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
            name: ingredientGroup?.ingredientGroupName ? ingredientGroup.ingredientGroupName : '',
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
      ingredientGroupId: '0',
      ingredientGroupName: this.ingredientsGroupEditForm?.get('name')?.value,
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
