import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { first, map } from 'rxjs';
import { Ingredient } from 'src/app/shared/models/ingredients';
import { addIngredient, editIngredient } from 'src/app/store/ingredients/ingredients.actions';
import { selectSelectedIngredient, selectSelectedIngredientGroup } from 'src/app/store/ingredients/ingredients.selectors';

@Component({
  selector: 'app-ingredients-edit',
  templateUrl: './ingredients-edit.component.html',
  styleUrls: ['./ingredients-edit.component.css']
})
export class IngredientsEditComponent {

  newOrExisitingIngredient?: 'new' | 'existing';
  ingredientsEditForm?: FormGroup;
  selectedIngredientGroupId?: string;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.ingredientsEditForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      ammount: [0, [Validators.required, Validators.pattern('[0-9]*')]],
      description: ['', [Validators.pattern('[a-zA-Z]*')]],
    });

    this.store.select(selectSelectedIngredient).pipe(
      first()
    ).subscribe((ingredient) => {
      this.newOrExisitingIngredient = ingredient ? 'existing' : 'new';
      if (this.newOrExisitingIngredient === 'existing') {
        this.ingredientsEditForm?.setValue({
          name: ingredient?.name ? ingredient.name : '',
          ammount: ingredient?.ammount ? ingredient.ammount : 0,
          description: ingredient?.description ? ingredient.description : ''
        })
      }
    });

    this.store.select(selectSelectedIngredientGroup).pipe(
      first(),
      map((ingredient) => ingredient?.id)
    ).subscribe((id) => {
      this.selectedIngredientGroupId = id;
    })
  }

  onSubmit() {
    const newIngredient: Ingredient = {
      id: '',
      name: this.ingredientsEditForm?.get('name')?.value,
      description: this.ingredientsEditForm?.get('description')?.value,
      ammount: this.ingredientsEditForm?.get('ammount')?.value
    }
    if (this.newOrExisitingIngredient === 'existing') {
      this.store.dispatch(editIngredient({ingredientGroupId: this.selectedIngredientGroupId!, ingredient: newIngredient}))    

    } else {
      this.store.dispatch(addIngredient({ingredientGroupId: this.selectedIngredientGroupId!, ingredient: newIngredient}))    
    }
  }

}
