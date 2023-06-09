import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IngredientGroup } from '@bar-manager/api';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  deleteIngredientGroup,
  loadIngredientGroups,
  resetSelectSingleIngredientGroup,
  selectSingleIngredientGroup,
} from 'src/app/store/ingredient-group/ingredient-group.actions';
import {
  selectIngredientGroupLoadingStatus,
  selectIngredientGroups,
} from 'src/app/store/ingredient-group/ingredient-group.selectors';
import { loadIngredients } from 'src/app/store/ingredients/ingredients.actions';

@Component({
  selector: 'app-ingredients-master',
  templateUrl: './ingredients-master.component.html',
  styleUrls: ['./ingredients-master.component.css'],
})
export class IngredientsMasterComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  loading$: Observable<boolean> = this.store.select(selectIngredientGroupLoadingStatus);
  ingredientGroups$: Observable<IngredientGroup[]> = this.store.select(selectIngredientGroups);
  ingredientGroupToDelete?: string;

  ngOnInit(): void {
    this.store.dispatch(loadIngredientGroups());
    this.store.dispatch(loadIngredients());
  }

  selectIngredientGroup(ingredientGroupId: string) {
    this.store.dispatch(selectSingleIngredientGroup({ ingredientGroupId }));
  }

  addIngredientGroup() {
    this.store.dispatch(resetSelectSingleIngredientGroup());
    this.router.navigateByUrl('/ingredients/group-edit');
  }

  openDeleteIngredientGroupModal(ingredientGroupId: string) {
    this.ingredientGroupToDelete = ingredientGroupId;
  }

  cancelDeleteIngredientGroupModal() {
    this.ingredientGroupToDelete = undefined;
  }

  confirmDeleteIngredientGroupModal() {
    this.store.dispatch(deleteIngredientGroup({ ingredientGroupId: this.ingredientGroupToDelete! }));
    this.ingredientGroupToDelete = undefined;
  }
}
