import { createReducer, on } from '@ngrx/store';
import * as RecipesActions from './recipes.actions';

export const featureKey = 'recipes'

export interface IState {
  recipes: any;
  loading: boolean;
}

export const initialState: IState = {
  recipes: {},
  loading: false
};

export const reducer = createReducer(
  initialState,
  on(RecipesActions.loadRecipes, state => ({ ...state, recipes: {}, loading: true })),
  on(RecipesActions.loadRecipesSuccess, (state, action) => ({ ...state, recipes: action.recipes, loading: false })),
  on(RecipesActions.loadRecipesFailure, state => ({ ...state, recipes: {}, loading: false })),
);