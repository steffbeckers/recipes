import { ActionReducerMap } from '@ngrx/store';

import * as fromRecipes from './recipes.reducer';

export const adminFeatureKey = 'admin';

export interface AdminFeatureState {
    recipes: fromRecipes.State;
}

export const reducers: ActionReducerMap<AdminFeatureState> = {
    recipes: fromRecipes.reducer
}
