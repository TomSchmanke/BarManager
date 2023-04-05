import { createReducer, on } from '@ngrx/store';
import * as IngredientsActions from './ingredients.actions';
import { IngredientGroup } from 'src/app/shared/models/ingredients';

export const featureKey = 'ingredients'

export interface IState {
  ingredients: IngredientGroup[];
  shownIngredients: IngredientGroup[];
  loading: boolean;
  selectedIngredients: 'all' | 'available' | 'unavailable';
}

export const initialState: IState = {
  ingredients: [],
  shownIngredients: [],
  loading: false,
  selectedIngredients: 'all'
};

export const reducer = createReducer(
  initialState,
  on(IngredientsActions.loadIngredients, state => ({ ...state, loading: true })),
  on(IngredientsActions.loadIngredientsSuccess, (state, action) => ({ ...state, ingredients: action.ingredients, shownIngredients: action.ingredients, loading: false })),
  on(IngredientsActions.loadIngredientsFailure, state => ({ ...state, ingredients: [], loading: false })),

  on(IngredientsActions.showAllIngredients, state => ({ 
    ...state, 
    selectedIngredients: 'all', 
    shownIngredients: state.ingredients
  })),
  on(IngredientsActions.showAvailableIngredients, state => ({ 
    ...state, 
    selectedIngredients: 'available', 
    shownIngredients: state.ingredients.filter(
      (ingredient) => ingredient.ingredients.reduce(
        (acc, value) => acc + value.ammount, 0
      ) > 0
    )
  })),
  on(IngredientsActions.showUnavailableIngredients, state => ({ 
    ...state, 
    selectedIngredients: 'unavailable', 
    shownIngredients: state.ingredients.filter(
      (ingredient) => ingredient.ingredients.reduce(
        (acc, value) => acc + value.ammount, 0
      ) === 0
    )
  })),
);