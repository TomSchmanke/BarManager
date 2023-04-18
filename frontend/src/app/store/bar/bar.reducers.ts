import { createReducer, on } from '@ngrx/store';
import * as BarActions from './bar.actions';
import { Bar } from '@bar-manager/api';

export const featureKey = 'bar';

export interface IState {
  bar: Bar;
  loading: boolean;
}

export const initialState: IState = {
  bar: {
    id: 1,
    name: 'Hello world',
    owner: {
      id: 1,
      name: 'Init',
    },
  },
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(BarActions.loadBar, state => ({ ...state, loading: true })),
  on(BarActions.loadBarSuccess, (state, action) => ({ ...state, bar: action.bar, loading: false })),
  on(BarActions.loadBarFailure, state => ({ ...state, loading: false }))
);
