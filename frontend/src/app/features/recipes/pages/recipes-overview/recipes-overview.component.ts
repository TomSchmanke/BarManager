import { Component, OnDestroy, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Cocktail } from '@bar-manager/api';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  deleteCocktail,
  loadCocktails,
  resetSelectedCocktail,
  setSelectedCocktail,
} from 'src/app/store/recipes/cocktails.actions';
import { selectCocktails, selectCocktailsLoadingStatus } from 'src/app/store/recipes/cocktails.selectors';

@Component({
  selector: 'app-recipes-overview',
  templateUrl: './recipes-overview.component.html',
  styleUrls: ['./recipes-overview.component.css'],
})
export class RecipesOverviewComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  loading$: Observable<boolean> = this.store.select(selectCocktailsLoadingStatus);
  cocktails$: Observable<Cocktail[]> = this.store.select(selectCocktails);
  cocktailToDelete?: string;

  ngOnInit(): void {
    this.store.dispatch(loadCocktails({ checkAvailability: false }));
  }

  selectCocktail(cocktail: Cocktail) {
    this.store.dispatch(setSelectedCocktail({ cocktail }));
  }

  openDeleteCocktailModal(cocktailId: string) {
    this.cocktailToDelete = cocktailId;
  }

  cancelDeleteCocktailModal() {
    this.cocktailToDelete = undefined;
  }

  confirmDeleteCocktailModal() {
    this.store.dispatch(deleteCocktail({ cocktailId: this.cocktailToDelete! }));
    this.cocktailToDelete = undefined;
  }

  addCocktail() {
    this.store.dispatch(resetSelectedCocktail());
    this.router.navigateByUrl('/recipes/edit');
  }
}
