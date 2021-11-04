import { createSelector } from '@ngrx/store';
import { RecipeListInputDto } from '@proxy/recipes';
import { selectCategories } from 'src/app/admin/categories/store';
import { selectAdminState } from 'src/app/admin/store/selectors/admin.selectors';
import { Category } from 'src/app/shared/models/category.model';
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

export const selectRecipesTotalCount = createSelector(
    selectRecipesState,
    (state: fromRecipes.State) => state.totalCount
);

export const selectRecipesList = createSelector(
    selectRecipesState,
    selectRecipes,
    selectCategories,
    (state: fromRecipes.State, recipes: Recipe[], categories: Category[]) => {
        return recipes
            .filter(x => state.pageContents[state.currentPage]?.includes(x.id))
            .map(recipe => {
                return {
                    ...recipe,
                    category: categories.find(x => x.id == recipe.categoryId),
                } as Recipe;
            });
    }
);

export const selectRecipesListInput = createSelector(
    selectRecipesState,
    (state: fromRecipes.State) => {
        return {
            maxResultCount: state.itemsPerPage,
            skipCount: (state.currentPage - 1) * state.itemsPerPage,
        } as RecipeListInputDto;
    }
);

export const selectRecipesListPagination = createSelector(
    selectRecipesState,
    (state: fromRecipes.State) => {
        return {
            pages: state.pages,
            currentPage: state.currentPage,
            itemsPerPage: state.itemsPerPage,
            totalCount: state.totalCount,
        };
    }
);

export const selectRecipe = createSelector(
    selectEntities,
    selectRouteParams,
    (recipes, { id }) => recipes[id]
);
