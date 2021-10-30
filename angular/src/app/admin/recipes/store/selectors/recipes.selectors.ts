import { createSelector } from '@ngrx/store';
import { selectAdminState } from 'src/app/admin/store/selectors/admin.selectors';
import { selectRouteParams } from 'src/app/store/selectors/router.selectors';

import * as fromAdmin from '../../../store/reducers/admin.reducer';
import * as fromRecipes from '../reducers/recipes.reducer';

export const selectRecipesState = createSelector(
    selectAdminState,
    (state: fromAdmin.State) => state.recipes
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
    fromRecipes.adapter.getSelectors(selectRecipesState);

export const selectRecipe = createSelector(
    selectEntities,
    selectRouteParams,
    (recipes, { id }) => recipes[id]
);
