import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ingredient, IngredientGroup, UnitOfMeasurement } from '@bar-manager/api';
import { Store } from '@ngrx/store';
import { Subscription, first } from 'rxjs';
import { addIngredientGroup, editIngredientGroup } from 'src/app/store/ingredient-group/ingredient-group.actions';
import { selectSelectedIngredientGroup } from 'src/app/store/ingredient-group/ingredient-group.selectors';

@Component({
  selector: 'app-ingredients-group-edit',
  templateUrl: './ingredients-group-edit.component.html',
  styleUrls: ['./ingredients-group-edit.component.css'],
})
export class IngredientsGroupEditComponent implements OnInit, OnDestroy {
  unitOfMeasurement = Object.keys(UnitOfMeasurement);

  newOrExisitingIngredientGroup?: 'new' | 'existing';
  ingredientsGroupEditForm?: FormGroup;
  selectedIngredientGroupIngredients?: Ingredient[] = [];
  private subscriptions = new Subscription();

  constructor(private store: Store, private formBuilder: FormBuilder) {}
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit() {
    this.ingredientsGroupEditForm = this.formBuilder.group({
      id: [undefined],
      name: ['', [Validators.required]],
      unitOfMeasurement: [0, [Validators.required]],
    });

    this.subscriptions.add(
      this.store
        .select(selectSelectedIngredientGroup)
        .pipe(first())
        .subscribe(ingredientGroup => {
          this.newOrExisitingIngredientGroup = ingredientGroup ? 'existing' : 'new';
          if (this.newOrExisitingIngredientGroup === 'existing') {
            this.ingredientsGroupEditForm?.setValue({
              id: ingredientGroup?.ingredientGroupId,
              name: ingredientGroup?.ingredientGroupName ? ingredientGroup.ingredientGroupName : '',
              unitOfMeasurement: ingredientGroup?.unitOfMeasurement
                ? ingredientGroup.unitOfMeasurement
                : UnitOfMeasurement.G,
            });

            this.selectedIngredientGroupIngredients = ingredientGroup?.ingredients;
          }
        })
    );
  }

  onSubmit() {
    const newIngredientGroup: IngredientGroup = {
      ingredientGroupId: this.ingredientsGroupEditForm?.get('id')?.value,
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
