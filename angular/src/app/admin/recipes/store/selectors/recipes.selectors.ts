import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRecipes from '../reducers/recipes.reducer';

export const selectRecipesState = createFeatureSelector<fromRecipes.State>(
    fromRecipes.recipesFeatureKey
);

export const selectListInput = createSelector(
    selectRecipesState,
    (state: fromRecipes.State) => state.listInput
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
    fromRecipes.adapter.getSelectors(selectRecipesState);
