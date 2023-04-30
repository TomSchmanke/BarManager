import { BarCreationResponse, Cocktail, LoginResponse } from '@bar-manager/api';
import { createReducer, on } from '@ngrx/store';

import * as BarActions from './bar.actions';
import { HttpErrorResponse } from '@angular/common/http';

//import { Bar } from '@bar-manager/api';

export const featureKey = 'bar';

export interface IState {
  bar?: BarCreationResponse | LoginResponse;
  error?: HttpErrorResponse;
  cocktails: Cocktail[];
  loading: boolean;
}

export const initialState: IState = {
  loading: false,
  cocktails: [],
};

export const reducer = createReducer(
  initialState,
  on(BarActions.loadBar, state => ({ ...state, loading: true })),
  on(BarActions.loadBarSuccess, (state, action) => ({ ...state, bar: action.loginResponse, loading: false })),
  on(BarActions.loadBarFailure, (state, action) => ({ ...state, error: action.error, loading: false })),
  on(BarActions.addBar, state => ({ ...state, loading: true })),
  on(BarActions.addBarSuccess, (state, action) => ({ ...state, bar: action.barCreationReponse, loading: false })),
  on(BarActions.addBarFailure, (state, action) => ({ ...state, error: action.error, loading: false }))
);
