import { HttpErrorResponse } from '@angular/common/http';
import { Cocktail } from '@bar-manager/api';
import { createAction, props } from '@ngrx/store';

export const loadCocktails = createAction('[cocktails] load cocktails', props<{ checkIfAvailable?: boolean }>());
export const loadCocktailsSuccess = createAction(
  '[cocktails] load cocktails success',
  props<{ cocktails: Cocktail[] }>()
);
export const loadCocktailsFailure = createAction(
  '[cocktails] load cocktails failure',
  props<{ error: HttpErrorResponse }>()
);

export const loadCocktail = createAction('[cocktails] load single cocktail', props<{ cocktailId: number }>());

export const loadCocktailSuccess = createAction(
  '[cocktails] load single cocktail success',
  props<{ cocktail: Cocktail }>()
);

export const loadCocktailFailure = createAction(
  '[cocktails] load single cocktail failure',
  props<{ error: HttpErrorResponse }>()
);

export const editCocktail = createAction('[cocktails] edit single cocktail', props<{ cocktail: Cocktail }>());

export const editCocktailSuccess = createAction(
  '[cocktails] edit single cocktail success',
  props<{ cocktail: Cocktail }>()
);

export const editCocktailFailure = createAction(
  '[cocktails] edit single cocktail failure',
  props<{ error: HttpErrorResponse }>()
);

export const deleteCocktail = createAction('[cocktails] delete single cocktail', props<{ cocktailId: number }>());
export const deleteCocktailSuccess = createAction(
  '[cocktails] delete single cocktail success',
  props<{ cocktailId: number }>()
);
export const deleteCocktailFailure = createAction(
  '[cocktails] delete single cocktail failure',
  props<{ error: HttpErrorResponse }>()
);

export const addCocktail = createAction('[cocktails] add single cocktail', props<{ cocktail: Cocktail }>());
export const addCocktailSuccess = createAction(
  '[cocktails] add single cocktail success',
  props<{ cocktail: Cocktail }>()
);
export const addCocktailFailure = createAction(
  '[cocktails] add single cocktail failure',
  props<{ error: HttpErrorResponse }>()
);
