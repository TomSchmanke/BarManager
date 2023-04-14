import { createReducer, on } from '@ngrx/store';
import * as BarActions from './bar.actions';

export const featureKey = 'bar';

export interface IState {
  bar: any;
  loading: boolean;
}

export const initialState: IState = {
  bar: {},
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(BarActions.loadBar, state => ({ ...state, bar: {}, loading: true })),
  on(BarActions.loadBarSuccess, (state, action) => ({ ...state, bar: action.bar, loading: false })),
  on(BarActions.loadBarFailure, state => ({ ...state, bar: {}, loading: false }))
);
