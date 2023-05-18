import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Ingredient, IngredientGroup } from '@bar-manager/api';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSelectedIngredientGroup } from 'src/app/store/ingredient-group/ingredient-group.selectors';
import {
  deleteIngredient,
  loadIngredients,
  resetSelectSingleIngredient,
} from 'src/app/store/ingredients/ingredients.actions';
import { selectSingleIngredient } from 'src/app/store/ingredients/ingredients.actions';
import {
  selectIngredientsContent,
  selectIngredientsLoadingStatus,
} from 'src/app/store/ingredients/ingredients.selectors';

@Component({
  selector: 'app-ingredients-detail',
  templateUrl: './ingredients-detail.component.html',
  styleUrls: ['./ingredients-detail.component.css'],
})
export class IngredientsDetailComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  loading$: Observable<boolean> = this.store.select(selectIngredientsLoadingStatus);
  ingredients$: Observable<Ingredient[]> = this.store.select(selectIngredientsContent);
  ingredientToDelete?: string;
  selectedIngredientGroup: Observable<IngredientGroup | undefined> = this.store.select(selectSelectedIngredientGroup);

  ngOnInit(): void {
    this.store.dispatch(loadIngredients());
  }

  selectIngredient(ingredientId: string) {
    this.store.dispatch(selectSingleIngredient({ ingredientId }));
  }

  addIngredient() {
    this.store.dispatch(resetSelectSingleIngredient());
    this.router.navigateByUrl('/ingredients/edit');
  }

  openDeleteIngredientModal(ingredientId: string) {
    this.ingredientToDelete = ingredientId;
  }

  cancelDeleteIngredientModal() {
    this.ingredientToDelete = undefined;
  }

  confirmDeleteIngredientModal() {
    this.store.dispatch(deleteIngredient({ ingredientId: this.ingredientToDelete! }));
    this.ingredientToDelete = undefined;
  }
}
