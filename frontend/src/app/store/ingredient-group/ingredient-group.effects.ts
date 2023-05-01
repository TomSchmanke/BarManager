import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { withLatestFrom, switchMap, map, catchError, of } from 'rxjs';
import { selectBarId } from '../bar/bar.selectors';
import * as fromIngredientGroupActions from './ingredient-group.actions';
import { IngredientGroupsService, IngredientsService } from '@bar-manager/api';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class IngredientsGroupEffects {
  private store = inject(Store);
  private actions$ = inject(Actions);
  private ingredientGroupsService = inject(IngredientGroupsService);

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
            'ingredient-group-id': action.ingredientGroup.id,
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

  private postIngredientGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromIngredientGroupActions.addIngredientGroup),
      withLatestFrom(this.store.select(selectBarId)),
      switchMap(([action, barId]) =>
        this.ingredientGroupsService
          .postIngredientGroup({
            'bar-id': barId,
            body: action.ingredientGroup,
          })
          .pipe(
            map(ingredientGroup =>
              fromIngredientGroupActions.addIngredientGroupSuccess({ ingredientGroup: ingredientGroup })
            ),
            catchError(error => of(fromIngredientGroupActions.addIngredientGroupFailure({ error })))
          )
      )
    )
  );
}
