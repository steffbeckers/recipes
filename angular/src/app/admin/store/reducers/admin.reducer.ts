import { ActionReducerMap } from '@ngrx/store';

import * as fromCategories from '../../categories/store';
import * as fromRecipes from '../../recipes/store';

export interface State {
    [fromCategories.categoriesFeatureKey]: fromCategories.State;
    [fromRecipes.recipesFeatureKey]: fromRecipes.State;
}

export const reducers: ActionReducerMap<State> = {
    [fromCategories.categoriesFeatureKey]: fromCategories.reducer,
    [fromRecipes.recipesFeatureKey]: fromRecipes.reducer,
};
