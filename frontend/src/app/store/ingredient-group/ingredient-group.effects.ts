import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { withLatestFrom, switchMap, map, catchError, of } from 'rxjs';
import { selectBarId } from '../bar/bar.selectors';
import * as fromIngredientsActions from './ingredient-group.actions';
import { IngredientGroupsService, IngredientsService } from '@bar-manager/api';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class IngredientsGroupEffects {
  private store = inject(Store);
  private actions$ = inject(Actions);
  private ingredientGroupsService = inject(IngredientGroupsService);

  private loadIngredientGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromIngredientsActions.loadIngredientGroups),
      withLatestFrom(this.store.select(selectBarId)),
      switchMap(([action, barId]) =>
        this.ingredientGroupsService.getIngredientGroups({ 'bar-id': barId }).pipe(
          map(ingredientGroups =>
            fromIngredientsActions.loadIngredientsGroupsSuccess({ ingredientGroups: ingredientGroups })
          ),
          catchError(error => of(fromIngredientsActions.loadIngredientsGroupsFailure({ error })))
        )
      )
    )
  );

  private putIngredientGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromIngredientsActions.editIngredientGroup),
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
              fromIngredientsActions.editIngredientGroupSuccess({ ingredientGroup: ingredientGroup })
            ),
            catchError((error: HttpErrorResponse) => of(fromIngredientsActions.editIngredientGroupFailure({ error })))
          )
      )
    )
  );

  private deleteIngredientGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromIngredientsActions.deleteIngredientGroup),
      withLatestFrom(this.store.select(selectBarId)),
      switchMap(([action, barId]) =>
        this.ingredientGroupsService
          .deleteIngredientGroup({
            'bar-id': barId,
            'ingredient-group-id': action.ingredientGroupId,
          })
          .pipe(
            map(() =>
              fromIngredientsActions.deleteIngredientGroupSuccess({ ingredientGroupId: action.ingredientGroupId })
            ),
            catchError(error => of(fromIngredientsActions.deleteIngredientGroupFailure({ error })))
          )
      )
    )
  );
}
