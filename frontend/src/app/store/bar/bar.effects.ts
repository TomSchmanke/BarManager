import { Injectable, inject } from '@angular/core';
import { LoginService, LoginResponse } from '@bar-manager/api';
import { Actions, act, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import * as fromBarActions from './bar.actions';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class BarEffects {
  private actions$ = inject(Actions);
  private loginService = inject(LoginService);

  private loadBar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromBarActions.loadBar),
      switchMap(action =>
        this.loginService.login({ 'bar-code': action.barCode }).pipe(
          map(loginResponse => fromBarActions.loadBarSuccess({ loginResponse: loginResponse })),
          catchError((error: HttpErrorResponse) => of(fromBarActions.loadBarFailure({ error })))
        )
      )
    )
  );
  private addBar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromBarActions.addBar),
      switchMap(action =>
        this.loginService.postBar({ body: action.barCreationRequest }).pipe(
          map(barCreationResponse => fromBarActions.addBarSuccess({ barCreationReponse: barCreationResponse })),
          catchError((error: HttpErrorResponse) => of(fromBarActions.addBarFailure({ error })))
        )
      )
    )
  );
}
