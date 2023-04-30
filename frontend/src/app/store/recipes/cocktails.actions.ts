import { HttpErrorResponse } from '@angular/common/http';
import { Cocktail } from '@bar-manager/api';
import { createAction, props } from '@ngrx/store';

export const loadCocktails = createAction(
  '[cocktails] load cocktails',
  props<{ barId: number; checkIfAvailable?: boolean }>()
);
export const loadCocktailsSuccess = createAction(
  '[cocktails] load cocktails success',
  props<{ cocktails: Cocktail[] }>()
);
export const loadCocktailsFailure = createAction(
  '[cocktails] load cocktails failure',
  props<{ error: HttpErrorResponse }>()
);

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
