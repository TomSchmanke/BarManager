import { Ingredient, IngredientGroup, IngredientGroupsService } from '@bar-manager/api';
import { createReducer, on } from '@ngrx/store';

import * as IngredientsActions from './ingredient-groups.actions';

export const featureKey = 'ingredients-groups';

export interface IState {
  ingredientGroups: IngredientGroup[];
  shownIngredientGroups: IngredientGroup[];
  selectedIngredientGroup?: IngredientGroup;
  loading: boolean;
}

export const initialState: IState = {
  ingredientGroups: [],
  shownIngredientGroups: [],
  selectedIngredientGroup: undefined,
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(IngredientsActions.loadIngredientGroups, state => ({
    ...state,
    loading: true,
  })),
  on(IngredientsActions.loadIngredientsGroupsSuccess, (state, action) => ({
    ...state,
    ingredientGroups: action.ingredientGroups,
    loading: false,
  })),
  on(IngredientsActions.loadIngredientsGroupsFailure, state => ({
    ...state,
    ingredients: [],
    loading: false,
  })),

  on(IngredientsActions.selectSingleIngredientGroup, (state, action) => ({
    ...state,
    selectedIngredientGroup: state.ingredientGroups.find(value => value.id === action.ingredientGroupId),
  })),
  on(IngredientsActions.resetSelectSingleIngredientGroup, state => ({
    ...state,
    selectedIngredientGroup: undefined,
  })),

  on(IngredientsActions.deleteIngredientGroup, state => ({
    ...state,
    loading: true,
  })),
  on(IngredientsActions.deleteIngredient, state => ({
    ...state,
    loading: true,
  })),
  on(IngredientsActions.deleteIngredientGroupSuccess, (state, action) => ({
    ...state,
    loading: false,
    ingredientGroups: state.ingredientGroups.filter(ingredientGroup => ingredientGroup.id !== action.ingredientGroupId),
    selectedIngredients: 'all',
  })),

  on(IngredientsActions.editIngredientGroup, state => ({
    ...state,
    loading: true,
  })),

  on(IngredientsActions.editIngredientGroupSuccess, (state, action) => ({
    ...state,
    loading: false,
    ingredientsGroups: state.ingredientGroups.map((ingredientGroup: IngredientGroup) => {
      return ingredientGroup.id === action.ingredientGroup.id ? action.ingredientGroup : ingredientGroup;
    }),
    selectedIngredients: 'all',
  }))
);
