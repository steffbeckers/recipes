import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';

// import * as fromRecipes from '../admin/store/reducers/recipes.reducer';

export interface State {
    // [fromRecipes.recipesFeatureKey]: fromRecipes.State;
}

export const reducers: ActionReducerMap<State> = {
    // [fromRecipes.recipesFeatureKey]: fromRecipes.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
