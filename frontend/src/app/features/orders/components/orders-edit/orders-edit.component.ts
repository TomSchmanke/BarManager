import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cocktail, IngredientGroup, UnitOfMeasurement } from '@bar-manager/api';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { loadIngredientGroups } from 'src/app/store/ingredient-group/ingredient-group.actions';
import { selectIngredientGroups } from 'src/app/store/ingredient-group/ingredient-group.selectors';
import { addCocktail, editCocktail } from 'src/app/store/recipes/cocktails.actions';
import { selectSelectedCocktail } from 'src/app/store/recipes/cocktails.selectors';

@Component({
  selector: 'app-orders-edit',
  templateUrl: './orders-edit.component.html',
  styleUrls: ['./orders-edit.component.css'],
})
export class OrderEditComponent implements OnInit, OnDestroy {
  newOrExistingCocktail?: 'new' | 'existing';
  cocktailEditForm?: FormGroup;
  allIngredients$?: Observable<IngredientGroup[]>;
  allIngredients?: IngredientGroup[];
  private subscriptions = new Subscription();
  constructor(private store: Store, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.cocktailEditForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      ingredients: this.formBuilder.array([]),
    });

    this.subscriptions.add(
      this.store.select(selectSelectedCocktail).subscribe(cocktail => {
        this.newOrExistingCocktail = cocktail ? 'existing' : 'new';
        if (this.newOrExistingCocktail === 'existing') {
          this.cocktailEditForm?.get('name')?.setValue(cocktail?.cocktailName ? cocktail.cocktailName : '');
          cocktail?.recipeIngredients?.forEach(item =>
            this.addIngredientToCocktailForm(item.ingredientGroupName, item.amount)
          );
        } else {
          this.addIngredientToCocktailForm();
        }
      })
    );

    this.store.dispatch(loadIngredientGroups());
    this.allIngredients$ = this.store.select(selectIngredientGroups);
    this.subscriptions.add(this.allIngredients$.subscribe(result => (this.allIngredients = result)));
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  addIngredientToCocktailForm(initialGroup = '', initalAmount = 0) {
    (<FormArray>this.cocktailEditForm?.get('ingredients')).push(
      this.formBuilder.group({
        ingredientGroup: [initialGroup ? initialGroup : '', Validators.required],
        amount: [initalAmount ? initalAmount : 0, Validators.required],
      })
    );
  }

  getUnitOfMeasurementToIngredient(ingredientName: string) {
    const uOM = this.allIngredients?.find(
      ingredient => ingredient.ingredientGroupId === ingredientName
    )?.unitOfMeasurement;
    return uOM ? uOM : UnitOfMeasurement.ML;
  }

  getIngredientsFormArray() {
    return this.cocktailEditForm?.controls['ingredients'] as FormArray;
  }

  changeIngredientGroup(index: number, event: any) {
    (<FormArray>this.cocktailEditForm?.get('ingredients'))
      .at(index)
      .get('ingredientGroup')
      ?.setValue(event.target.value);
  }

  onSubmit() {
    const newCocktail: Cocktail = {
      cocktailId: '0',
      cocktailName: this.cocktailEditForm?.get('name')?.value,
      recipeIngredients: [],
    };
    (<FormArray>this.cocktailEditForm?.get('ingredients')).controls.forEach(item =>
      newCocktail.recipeIngredients?.push({
        ingredientGroupName: item.value.ingredientGroup,
        amount: item.value.amount,
        unitOfMeasurement: this.getUnitOfMeasurementToIngredient(item.value.ingredientGroup),
      })
    );

    if (this.newOrExistingCocktail === 'existing') {
      this.store.dispatch(editCocktail({ cocktail: newCocktail }));
    } else {
      this.store.dispatch(addCocktail({ cocktail: newCocktail }));
    }
  }
}
