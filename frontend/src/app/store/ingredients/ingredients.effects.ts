import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Ingredient, IngredientsService } from '@bar-manager/api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { selectBarId } from '../bar/bar.selectors';
import * as fromIngredientsActions from './ingredients.actions';

@Injectable()
export class IngredientsEffects {
  private store = inject(Store);
  private actions$ = inject(Actions);
  private ingredientsService = inject(IngredientsService);
  private router = inject(Router);

  private loadIngredients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromIngredientsActions.loadIngredients),
      withLatestFrom(this.store.select(selectBarId)),
      switchMap(([action, barId]) =>
        this.ingredientsService.getIngredients({ 'bar-id': barId }).pipe(
          map(ingredients => fromIngredientsActions.loadIngredientsSuccess({ ingredients: ingredients })),
          catchError(error => of(fromIngredientsActions.loadIngredientsFailure({ error })))
        )
      )
    )
  );

  private putIngredient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromIngredientsActions.editIngredient),
      withLatestFrom(this.store.select(selectBarId)),
      mergeMap(([action, barId]) => {
        return this.ingredientsService
          .putIngredient({ 'bar-id': barId, 'ingredient-id': action.ingredient.ingredientId, body: action.ingredient })
          .pipe(
            map(ingredients => fromIngredientsActions.editIngredientSuccess({ ingredient: ingredients })),
            catchError(error => of(fromIngredientsActions.editIngredientFailure({ error })))
          );
      })
    )
  );

  private deleteIngredient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromIngredientsActions.deleteIngredient),
      withLatestFrom(this.store.select(selectBarId)),
      switchMap(([action, barId]) =>
        this.ingredientsService
          .deleteIngredient({
            'bar-id': barId,
            'ingredient-id': action.ingredientId,
          })
          .pipe(
            map(() => fromIngredientsActions.deleteIngredientSuccess({ ingredientId: action.ingredientId })),
            catchError(error => of(fromIngredientsActions.deleteIngredientFailure({ error })))
          )
      )
    )
  );

  private updateIngredientSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromIngredientsActions.editIngredientSuccess, fromIngredientsActions.addIngredientSuccess),
        tap(() => this.router.navigate(['/ingredients']))
      ),
    { dispatch: false }
  );

  private reduceIngredients$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromIngredientsActions.reduceIngredients),
        tap(action => {
          for (const ingredient of action.ingredients) {
            this.store.dispatch(fromIngredientsActions.reduceIngredient({ ingredient: ingredient }));
          }
        })
      ),
    { dispatch: false }
  );

  private reduceIngredient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromIngredientsActions.reduceIngredient),
      withLatestFrom(this.store.select(selectBarId)),
      mergeMap(([action, barId]) =>
        this.ingredientsService
          .putIngredient({ 'bar-id': barId, 'ingredient-id': action.ingredient.ingredientId, body: action.ingredient })
          .pipe(
            map(ingredients => fromIngredientsActions.reduceIngredientSuccess({ ingredient: ingredients })),
            catchError(error => of(fromIngredientsActions.editIngredientFailure({ error })))
          )
      )
    )
  );

  private reduceIngredientSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromIngredientsActions.reduceIngredientSuccess),
        tap(() => this.router.navigate(['/orders']))
      ),
    { dispatch: false }
  );

  private postIngredient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromIngredientsActions.addIngredient),
      withLatestFrom(this.store.select(selectBarId)),
      switchMap(([action, barId]) => {
        const ingredientObj: any = {
          amount: action.ingredient.amount,
          description: action.ingredient.description,
          ingredientName: action.ingredient.ingredientName,
        };
        delete ingredientObj['ingredientId'];
        return this.ingredientsService
          .postIngredient({
            'bar-id': barId,
            'ingredient-group-id': action.ingredientGroupId,
            body: ingredientObj,
          })
          .pipe(
            map(ingredient => fromIngredientsActions.addIngredientSuccess({ ingredient: ingredient })),
            catchError(error => of(fromIngredientsActions.addIngredientFailure({ error })))
          );
      })
    )
  );
}
