import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRecipes from '../reducers/recipes.reducer';

export const selectRecipesState = createFeatureSelector<fromRecipes.State>(
  fromRecipes.recipesFeatureKey
);
