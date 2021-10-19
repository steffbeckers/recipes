import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Recipe } from 'src/app/shared/recipe.model';

import * as PublicActions from '../actions/public.actions';

export const publicFeatureKey = 'public';

export interface State extends EntityState<Recipe> {
    loading: boolean;
    error: any;
}

export const adapter: EntityAdapter<Recipe> = createEntityAdapter<Recipe>();

export const initialState: State = adapter.getInitialState({
    loading: false,
    error: null
});

export const reducer = createReducer(
    initialState,
    on(PublicActions.loadRecipes, (state) => {
        return {
            ...state,
            loading: true,
            error: null
        }
    }),
    on(PublicActions.loadRecipesSuccess, (state, { recipes }) => {
        return adapter.upsertMany(recipes.items, state);
    }),
    on(PublicActions.loadRecipesFailure, (state, { error }) => {
        return {
            ...state,
            loading: false,
            error
        }
    }),
);
