import { createSelector } from '@ngrx/store';
import { selectCategories } from 'src/app/admin/categories/store';
import { selectAdminState } from 'src/app/admin/store/selectors/admin.selectors';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { selectRouteParams } from 'src/app/store/selectors/router.selectors';

import * as fromAdmin from '../../../store/reducers/admin.reducer';
import * as fromRecipes from '../reducers/recipes.reducer';

export const selectRecipesState = createSelector(
    selectAdminState,
    (state: fromAdmin.State) => state.recipes
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
    fromRecipes.adapter.getSelectors(selectRecipesState);

export const selectRecipes = selectAll;

export const selectRecipesWithCategory = createSelector(
    selectRecipes,
    selectCategories,
    (recipes, categories) => {
        return recipes.map(recipe => {
            return {
                ...recipe,
                category: categories.find(x => x.id == recipe.categoryId),
            } as Recipe;
        });
    }
);

export const selectRecipe = createSelector(
    selectEntities,
    selectRouteParams,
    (recipes, { id }) => recipes[id]
);
