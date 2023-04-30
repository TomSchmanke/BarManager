import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CocktailsService } from '@bar-manager/api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import * as fromCocktailActions from './cocktails.actions';

@Injectable()
export class CocktailsEffects {
  private actions$ = inject(Actions);
  private cocktailsService = inject(CocktailsService);
  private loadCocktail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCocktailActions.loadCocktails),
      switchMap(action =>
        this.cocktailsService
          .getCocktails({ 'check-if-available': action.checkIfAvailable, 'bar-id': action.barId })
          .pipe(
            map(cocktailResponse => fromCocktailActions.loadCocktailsSuccess({ cocktails: cocktailResponse })),
            catchError((error: HttpErrorResponse) => of(fromCocktailActions.loadCocktailsFailure({ error })))
          )
      )
    )
  );
}
