import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from '@bar-manager/api';
import { Store } from '@ngrx/store';
import { Subscription, first, map } from 'rxjs';
import { selectSelectedIngredientGroup } from 'src/app/store/ingredient-group/ingredient-group.selectors';
import { addIngredient, editIngredient } from 'src/app/store/ingredients/ingredients.actions';
import { selectSelectedIngredient } from 'src/app/store/ingredients/ingredients.selectors';

@Component({
  selector: 'app-ingredients-edit',
  templateUrl: './ingredients-edit.component.html',
  styleUrls: ['./ingredients-edit.component.css'],
})
export class IngredientsEditComponent implements OnInit, OnDestroy {
  newOrExisitingIngredient?: 'new' | 'existing';
  ingredientsEditForm?: FormGroup;
  selectedIngredientGroupId?: string;
  ingredientId?: string;
  private subscriptions = new Subscription();
  constructor(private store: Store, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.ingredientsEditForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      amount: [0, [Validators.required, Validators.pattern('[0-9]*')]],
      description: [''],
    });

    this.subscriptions.add(
      this.store.select(selectSelectedIngredient).subscribe(ingredient => {
        this.newOrExisitingIngredient = ingredient ? 'existing' : 'new';
        if (this.newOrExisitingIngredient === 'existing') {
          this.ingredientId = ingredient?.ingredientId;
          this.ingredientsEditForm?.setValue({
            name: ingredient?.ingredientName ? ingredient.ingredientName : '',
            amount: ingredient?.amount ? ingredient.amount : 0,
            description: ingredient?.description ? ingredient.description : '',
          });
        }
      })
    );

    this.subscriptions.add(
      this.store
        .select(selectSelectedIngredientGroup)
        .pipe(
          first(),
          map(ingredient => ingredient?.ingredientGroupId)
        )
        .subscribe(id => {
          this.selectedIngredientGroupId = id;
        })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit() {
    const newIngredient: Ingredient = {
      ingredientId: '0',
      ingredientName: this.ingredientsEditForm?.get('name')?.value,
      description: this.ingredientsEditForm?.get('description')?.value,
      amount: this.ingredientsEditForm?.get('amount')?.value,
    };
    if (this.newOrExisitingIngredient === 'existing') {
      newIngredient.ingredientId = this.ingredientId!;
      this.store.dispatch(editIngredient({ ingredient: newIngredient }));
    } else {
      this.store.dispatch(
        addIngredient({ ingredientGroupId: this.selectedIngredientGroupId!, ingredient: newIngredient })
      );
    }
  }
}
