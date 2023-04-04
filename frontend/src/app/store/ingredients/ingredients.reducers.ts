import { createReducer, on } from '@ngrx/store';
import * as IngredientsActions from './ingredients.actions';

export const featureKey = 'ingredients'

export interface IState {
  ingredients: any;
  loading: boolean;
}

export const initialState: IState = {
  ingredients: {},
  loading: false
};

export const reducer = createReducer(
  initialState,
  on(IngredientsActions.loadIngredients, state => ({ ...state, ingredients: {}, loading: true })),
  on(IngredientsActions.loadIngredientsSuccess, (state, action) => ({ ...state, ingredients: action.ingredients, loading: false })),
  on(IngredientsActions.loadIngredientsFailure, state => ({ ...state, ingredients: {}, loading: false })),
);