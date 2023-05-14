import { BarCreationResponse, Cocktail, LoginResponse, Order } from '@bar-manager/api';
import { createReducer, on } from '@ngrx/store';

import * as BarActions from './bar.actions';
import { HttpErrorResponse } from '@angular/common/http';

//import { Bar } from '@bar-manager/api';

export const featureKey = 'bar';

export interface BarState {
  bar: BarCreationResponse | LoginResponse;
  error?: HttpErrorResponse;
  cocktails: Cocktail[];
  orders: Order[];
  loading: boolean;
  loadedSuccessfully: boolean;
}

export const initialState: BarState = {
  loading: false,
  loadedSuccessfully: false,
  bar: { barId: '0', barName: '', ownerName: '', barCode: '000000' },
  cocktails: [],
  orders: [],
};

export const reducer = createReducer(
  initialState,
  on(BarActions.loadBar, state => ({ ...state, loading: true })),
  on(BarActions.loadBarSuccess, (state, action) => ({
    ...state,
    bar: action.loginResponse,
    loading: false,
    loadedSuccessfully: true,
  })),
  on(BarActions.loadBarFailure, (state, action) => ({ ...state, error: action.error, loading: false })),
  on(BarActions.addBar, state => ({ ...state, loading: true })),
  on(BarActions.addBarSuccess, (state, action) => ({
    ...state,
    bar: action.barCreationReponse,
    loading: false,
    loadedSuccessfully: true,
  })),
  on(BarActions.addBarFailure, (state, action) => ({ ...state, error: action.error, loading: false }))
);
