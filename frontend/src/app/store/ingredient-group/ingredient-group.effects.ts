import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IngredientGroupsService } from '@bar-manager/api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { selectBarId } from '../bar/bar.selectors';
import * as fromIngredientGroupActions from './ingredient-group.actions';
import { Router } from '@angular/router';

@Injectable()
export class IngredientsGroupEffects {
  private store = inject(Store);
  private actions$ = inject(Actions);
  private ingredientGroupsService = inject(IngredientGroupsService);
  private router = inject(Router);

  private loadIngredientGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromIngredientGroupActions.loadIngredientGroups),
      withLatestFrom(this.store.select(selectBarId)),
      switchMap(([action, barId]) =>
        this.ingredientGroupsService.getIngredientGroups({ 'bar-id': barId }).pipe(
          map(ingredientGroups =>
            fromIngredientGroupActions.loadIngredientsGroupsSuccess({ ingredientGroups: ingredientGroups })
          ),
          catchError(error => of(fromIngredientGroupActions.loadIngredientsGroupsFailure({ error })))
        )
      )
    )
  );

  private putIngredientGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromIngredientGroupActions.editIngredientGroup),
      withLatestFrom(this.store.select(selectBarId)),
      switchMap(([action, barId]) =>
        this.ingredientGroupsService
          .putIngredientGroup({
            'bar-id': barId,
            'ingredient-group-id': action.ingredientGroup.ingredientGroupId,
            body: action.ingredientGroup,
          })
          .pipe(
            map(ingredientGroup =>
              fromIngredientGroupActions.editIngredientGroupSuccess({ ingredientGroup: ingredientGroup })
            ),
            catchError((error: HttpErrorResponse) =>
              of(fromIngredientGroupActions.editIngredientGroupFailure({ error }))
            )
          )
      )
    )
  );

  private deleteIngredientGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromIngredientGroupActions.deleteIngredientGroup),
      withLatestFrom(this.store.select(selectBarId)),
      switchMap(([action, barId]) =>
        this.ingredientGroupsService
          .deleteIngredientGroup({
            'bar-id': barId,
            'ingredient-group-id': action.ingredientGroupId,
          })
          .pipe(
            map(() =>
              fromIngredientGroupActions.deleteIngredientGroupSuccess({ ingredientGroupId: action.ingredientGroupId })
            ),
            catchError(error => of(fromIngredientGroupActions.deleteIngredientGroupFailure({ error })))
          )
      )
    )
  );

  private updateIngredientGroupSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromIngredientGroupActions.editIngredientGroupSuccess,
          fromIngredientGroupActions.addIngredientGroupSuccess
        ),
        withLatestFrom(this.store.select(selectBarId)),
        tap(() => this.router.navigate(['/ingredients']))
      ),
    { dispatch: false }
  );

  private postIngredientGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromIngredientGroupActions.addIngredientGroup),
      withLatestFrom(this.store.select(selectBarId)),
      switchMap(([action, barId]) => {
        const ingredientGroupObj: any = {
          ingredientGroupName: action.ingredientGroup.ingredientGroupName,
          ingredients: action.ingredientGroup.ingredients,
          unitOfMeasurement: action.ingredientGroup.unitOfMeasurement,
        };
        return this.ingredientGroupsService
          .postIngredientGroup({
            'bar-id': barId,
            body: ingredientGroupObj,
          })
          .pipe(
            map(ingredientGroup =>
              fromIngredientGroupActions.addIngredientGroupSuccess({ ingredientGroup: ingredientGroup })
            ),
            catchError(error => of(fromIngredientGroupActions.addIngredientGroupFailure({ error })))
          );
      })
    )
  );
}
