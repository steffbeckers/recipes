import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';
import * as fromCategories from '../admin/categories/store/reducers/categories.reducer';
import * as fromRecipes from '../admin/recipes/store/reducers/recipes.reducer';

export interface State {
    router: RouterReducerState<any>;
    [fromCategories.categoriesFeatureKey]: fromCategories.State;
    [fromRecipes.recipesFeatureKey]: fromRecipes.State;
}

export const reducers: ActionReducerMap<State> = {
    router: routerReducer,
    [fromCategories.categoriesFeatureKey]: fromCategories.reducer,
    [fromRecipes.recipesFeatureKey]: fromRecipes.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
