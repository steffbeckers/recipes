import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouteParams } from 'src/app/store/selectors/router.selectors';

import * as fromRecipes from '../reducers/recipes.reducer';

export const selectRecipesState = createFeatureSelector<fromRecipes.State>(
    fromRecipes.recipesFeatureKey
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
    fromRecipes.adapter.getSelectors(selectRecipesState);

export const selectRecipe = createSelector(
    selectEntities,
    selectRouteParams,
    (recipes, { id }) => recipes[id]
);
