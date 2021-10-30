import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';
import * as fromAdminCategories from '../admin/categories/store/reducers/categories.reducer';
import * as fromAdminRecipes from '../admin/recipes/store/reducers/recipes.reducer';

export interface State {
    router: RouterReducerState<any>;
    [fromAdminCategories.categoriesFeatureKey]: fromAdminCategories.State;
    [fromAdminRecipes.recipesFeatureKey]: fromAdminRecipes.State;
}

export const reducers: ActionReducerMap<State> = {
    router: routerReducer,
    [fromAdminCategories.categoriesFeatureKey]: fromAdminCategories.reducer,
    [fromAdminRecipes.recipesFeatureKey]: fromAdminRecipes.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
