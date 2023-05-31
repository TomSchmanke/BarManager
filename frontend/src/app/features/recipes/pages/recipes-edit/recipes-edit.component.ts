import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cocktail, IngredientGroup, UnitOfMeasurement } from '@bar-manager/api';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadIngredientGroups } from 'src/app/store/ingredient-group/ingredient-group.actions';
import { selectIngredientGroups } from 'src/app/store/ingredient-group/ingredient-group.selectors';
import { addCocktail, editCocktail } from 'src/app/store/recipes/cocktails.actions';
import { selectSelectedCocktail } from 'src/app/store/recipes/cocktails.selectors';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css'],
})
export class RecipesEditComponent {
  newOrExistingCocktail?: 'new' | 'existing';
  cocktailEditForm?: FormGroup;
  allIngredients$?: Observable<IngredientGroup[]>;
  allIngredients?: IngredientGroup[];
  cocktailId!: string;
  constructor(private store: Store, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.cocktailEditForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      ingredients: this.formBuilder.array([]),
    });

    this.store.select(selectSelectedCocktail).subscribe(cocktail => {
      this.newOrExistingCocktail = cocktail ? 'existing' : 'new';
      if (this.newOrExistingCocktail === 'existing') {
        this.cocktailId = cocktail!.cocktailId;
        this.cocktailEditForm?.get('name')?.setValue(cocktail?.cocktailName ? cocktail.cocktailName : '');
        cocktail?.recipeIngredients?.forEach(item =>
          this.addIngredientToCocktailForm(item.ingredientGroupName, item.amount)
        );
      } else {
        this.addIngredientToCocktailForm();
      }
    });

    this.store.dispatch(loadIngredientGroups());
    this.allIngredients$ = this.store.select(selectIngredientGroups);
    this.allIngredients$.subscribe(result => (this.allIngredients = result));
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
      ingredient => ingredient.ingredientGroupName === ingredientName
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
    const newCocktail: any = {
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
      newCocktail.cocktailId = this.cocktailId;
      this.store.dispatch(editCocktail({ cocktail: newCocktail }));
    } else {
      this.store.dispatch(addCocktail({ cocktail: newCocktail }));
    }
  }
}
