import { Ingredient, IngredientGroup, IngredientGroupsService } from '@bar-manager/api';
import { createReducer, on } from '@ngrx/store';

import * as IngredientsActions from './ingredients.actions';

export const featureKey = 'ingredients';

export interface IState {
  ingredients: Ingredient[];
  ingredientGroups: IngredientGroup[];
  shownIngredientGroups: IngredientGroup[];
  selectedIngredientGroup?: IngredientGroup;
  selectedIngredient?: Ingredient;
  loading: boolean;
  selectedIngredients: 'all' | 'available' | 'unavailable';
}

export const initialState: IState = {
  ingredients: [],
  ingredientGroups: [],
  shownIngredientGroups: [],
  selectedIngredientGroup: undefined,
  selectedIngredient: undefined,
  loading: false,
  selectedIngredients: 'all',
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

  on(IngredientsActions.showAllIngredientsGroups, state => ({
    ...state,
    selectedIngredients: 'all',
    shownIngredients: state.ingredients,
  })),
  // on(IngredientsActions.showAvailableIngredientsGroups, state => ({
  //   ...state,
  //   selectedIngredients: 'available',
  //   shownIngredients: state.ingredients.filter(
  //     ingredient => ingredient.ingredients.reduce((acc, value) => acc + value.amount, 0) > 0
  //   ),
  // })),
  // on(IngredientsActions.showUnavailableIngredientsGroups, state => ({
  //   ...state,
  //   selectedIngredients: 'unavailable',
  //   shownIngredients: state.ingredients.filter(
  //     ingredient => ingredient.ingredients.reduce((acc, value) => acc + value.amount, 0) === 0
  //   ),
  // })),

  on(IngredientsActions.selectSingleIngredientGroup, (state, action) => ({
    ...state,
    selectedIngredientGroup: state.ingredientGroups.find(value => value.id === action.ingredientGroupId),
  })),
  on(IngredientsActions.resetSelectSingleIngredientGroup, state => ({
    ...state,
    selectedIngredientGroup: undefined,
  })),

  // on(IngredientsActions.selectSingleIngredient, (state, action) => ({
  //   ...state,
  //   selectedIngredient: state.selectedIngredientGroup!.ingredients.find(value => value.id === action.ingredientId),
  // })),
  on(IngredientsActions.resetSelectSingleIngredient, state => ({
    ...state,
    selectedIngredient: undefined,
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
  on(IngredientsActions.deleteIngredientSuccess, (state, action) => ({
    ...state,
    loading: false,
    ingredients: state.ingredients.filter(ingredient => ingredient.id !== action.ingredientId),
    selectedIngredients: 'all',
  })),

  on(IngredientsActions.editIngredientGroup, state => ({
    ...state,
    loading: true,
  })),
  on(IngredientsActions.editIngredient, state => ({
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
  })),
  on(IngredientsActions.editIngredientSuccess, (state, action) => ({
    ...state,
    loading: false,
    ingredients: state.ingredients.map((ingredient: Ingredient) => {
      return ingredient.id === action.ingredient.id ? action.ingredient : ingredient;
    }),
    selectedIngredients: 'all',
  }))
);
