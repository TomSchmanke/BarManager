import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CocktailsService } from '@bar-manager/api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of, withLatestFrom } from 'rxjs';
import * as fromCocktailActions from './cocktails.actions';
import { Store } from '@ngrx/store';
import { selectBarId } from '../bar/bar.selectors';

@Injectable()
export class CocktailsEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private cocktailsService = inject(CocktailsService);

  private loadCocktails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCocktailActions.loadCocktails),
      withLatestFrom(this.store.select(selectBarId)),
      switchMap(([action, barId]) =>
        this.cocktailsService.getCocktails({ 'bar-id': barId }).pipe(
          map(cocktail => fromCocktailActions.loadCocktailsSuccess({ cocktails: cocktail })),
          catchError(error => of(fromCocktailActions.loadCocktailsFailure({ error })))
        )
      )
    )
  );
  private loadCocktail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCocktailActions.loadCocktail),
      withLatestFrom(this.store.select(selectBarId)),
      switchMap(([action, barId]) =>
        this.cocktailsService
          .getCocktail({
            'bar-id': barId,
            'cocktail-id': action.cocktailId,
          })
          .pipe(
            map(cocktail => fromCocktailActions.loadCocktailSuccess({ cocktail: cocktail })),
            catchError(error => of(fromCocktailActions.loadCocktailFailure({ error })))
          )
      )
    )
  );

  private putCocktail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCocktailActions.editCocktail),
      withLatestFrom(this.store.select(selectBarId)),
      switchMap(([action, barId]) =>
        this.cocktailsService
          .putCocktail({
            'bar-id': barId,
            'cocktail-id': action.cocktail.id,
            body: action.cocktail,
          })
          .pipe(
            map(cocktail => fromCocktailActions.editCocktailSuccess({ cocktail: cocktail })),
            catchError((error: HttpErrorResponse) => of(fromCocktailActions.editCocktailFailure({ error })))
          )
      )
    )
  );

  private deleteCocktail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCocktailActions.deleteCocktail),
      withLatestFrom(this.store.select(selectBarId)),
      switchMap(([action, barId]) =>
        this.cocktailsService
          .deleteCocktail({
            'bar-id': barId,
            'cocktail-id': action.cocktailId,
          })
          .pipe(
            map(() => fromCocktailActions.deleteCocktailSuccess({ cocktailId: action.cocktailId })),
            catchError(error => of(fromCocktailActions.deleteCocktailFailure({ error })))
          )
      )
    )
  );

  private postCocktail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCocktailActions.addCocktail),
      withLatestFrom(this.store.select(selectBarId)),
      switchMap(([action, barId]) =>
        this.cocktailsService
          .postCocktail({
            'bar-id': barId,
            body: action.cocktail,
          })
          .pipe(
            map(() => fromCocktailActions.addCocktailSuccess({ cocktail: action.cocktail })),
            catchError(error => of(fromCocktailActions.addCocktailFailure({ error })))
          )
      )
    )
  );
}
