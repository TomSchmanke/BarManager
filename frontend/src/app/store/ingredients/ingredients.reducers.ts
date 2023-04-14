import { createReducer, on } from '@ngrx/store';
import * as IngredientsActions from './ingredients.actions';
import { Ingredient, IngredientGroup } from 'src/app/shared/models/ingredients';

export const featureKey = 'ingredients';

export interface IState {
  ingredients: IngredientGroup[];
  shownIngredients: IngredientGroup[];
  selectedIngredientGroup?: IngredientGroup;
  selectedIngredient?: Ingredient;
  loading: boolean;
  selectedIngredients: 'all' | 'available' | 'unavailable';
}

export const initialState: IState = {
  ingredients: [],
  shownIngredients: [],
  selectedIngredientGroup: undefined,
  selectedIngredient: undefined,
  loading: false,
  selectedIngredients: 'all',
};

export const reducer = createReducer(
  initialState,
  on(IngredientsActions.loadIngredients, (state) => ({
    ...state,
    loading: true,
  })),
  on(IngredientsActions.loadIngredientsSuccess, (state, action) => ({
    ...state,
    ingredients: action.ingredients,
    shownIngredients: action.ingredients,
    loading: false,
  })),
  on(IngredientsActions.loadIngredientsFailure, (state) => ({
    ...state,
    ingredients: [],
    loading: false,
  })),

  on(IngredientsActions.showAllIngredientsGroups, (state) => ({
    ...state,
    selectedIngredients: 'all',
    shownIngredients: state.ingredients,
  })),
  on(IngredientsActions.showAvailableIngredientsGroups, (state) => ({
    ...state,
    selectedIngredients: 'available',
    shownIngredients: state.ingredients.filter(
      (ingredient) =>
        ingredient.ingredients.reduce((acc, value) => acc + value.ammount, 0) >
        0
    ),
  })),
  on(IngredientsActions.showUnavailableIngredientsGroups, (state) => ({
    ...state,
    selectedIngredients: 'unavailable',
    shownIngredients: state.ingredients.filter(
      (ingredient) =>
        ingredient.ingredients.reduce(
          (acc, value) => acc + value.ammount,
          0
        ) === 0
    ),
  })),

  on(IngredientsActions.selectSingleIngredientGroup, (state, action) => ({
    ...state,
    selectedIngredientGroup: state.ingredients.find(
      (value) => value.id === action.ingredientGroupId
    ),
  })),
  on(IngredientsActions.resetSelectSingleIngredientGroup, (state) => ({
    ...state,
    selectedIngredientGroup: undefined,
  })),

  on(IngredientsActions.selectSingleIngredient, (state, action) => ({
    ...state,
    selectedIngredient: state.selectedIngredientGroup!.ingredients.find(
      (value) => value.id === action.ingredientId
    ),
  })),
  on(IngredientsActions.resetSelectSingleIngredient, (state) => ({
    ...state,
    selectedIngredient: undefined,
  })),

  on(IngredientsActions.deleteIngredientGroup, (state) => ({
    ...state,
    loading: true,
  })),
  on(IngredientsActions.deleteIngredient, (state) => ({
    ...state,
    loading: true,
  })),
  on(IngredientsActions.deleteIngredientGroupSuccess, (state, action) => ({
    ...state,
    loading: false,
    ingredients: action.ingredients,
    shownIngredients: action.ingredients,
    selectedIngredients: 'all',
  })),
  on(IngredientsActions.deleteIngredientSuccess, (state, action) => ({
    ...state,
    loading: false,
    ingredients: action.ingredients,
    shownIngredients: action.ingredients,
    selectedIngredients: 'all',
  })),

  on(IngredientsActions.editIngredientGroup, (state) => ({
    ...state,
    loading: true,
  })),
  on(IngredientsActions.editIngredient, (state) => ({
    ...state,
    loading: true,
  })),
  on(IngredientsActions.editIngredientGroupSuccess, (state, action) => ({
    ...state,
    loading: false,
    ingredients: action.ingredients,
    shownIngredients: action.ingredients,
    selectedIngredients: 'all',
  })),
  on(IngredientsActions.editIngredientSuccess, (state, action) => ({
    ...state,
    loading: false,
    ingredients: action.ingredients,
    shownIngredients: action.ingredients,
    selectedIngredients: 'all',
  }))
);
