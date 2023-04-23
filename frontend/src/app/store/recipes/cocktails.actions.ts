import { HttpErrorResponse } from '@angular/common/http';
import { Cocktail } from '@bar-manager/api';
import { createAction, props } from '@ngrx/store';

export const loadSingleCocktail = createAction(
  '[cocktails] load single cocktail',
  props<{ barId: number; cocktailId: number }>()
);

export const loadSingleCocktailSuccess = createAction(
  '[cocktails] load single cocktail success',
  props<{ cocktail: Cocktail }>()
);

export const loadSingleCocktailFailure = createAction(
  '[cocktails] load single cocktail failure',
  props<{ error: HttpErrorResponse }>()
);
