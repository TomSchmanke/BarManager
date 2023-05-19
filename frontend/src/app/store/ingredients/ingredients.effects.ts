import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { withLatestFrom, switchMap, map, catchError, of, tap } from 'rxjs';
import { selectBarId } from '../bar/bar.selectors';
import * as fromIngredientsActions from './ingredients.actions';
import { IngredientGroupsService, IngredientsService } from '@bar-manager/api';
import { HttpErrorResponse } from '@angular/common/http';
import { selectIngredientGroups, selectSelectedIngredientGroup } from '../ingredient-group/ingredient-group.selectors';
import { Router } from '@angular/router';

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
      switchMap(([action, barId]) =>
        this.ingredientsService
          .putIngredient({ 'bar-id': barId, 'ingredient-id': action.ingredient.ingredientId, body: action.ingredient })
          .pipe(
            map(ingredients => fromIngredientsActions.editIngredientSuccess({ ingredient: ingredients })),
            catchError(error => of(fromIngredientsActions.editIngredientFailure({ error })))
          )
      )
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
        withLatestFrom(this.store.select(selectBarId)),
        tap(() => this.router.navigate(['/ingredients']))
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
