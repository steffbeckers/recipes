import { PagedResultDto } from '@abp/ng.core';
import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { GetRecipesInput, RecipeListDto } from '@proxy/recipes';

import * as PublicActions from '../actions/public.actions';

export const publicFeatureKey = 'public';

export interface State {
    loading: boolean;
    error: any;
    getRecipesInput: GetRecipesInput;
    recipes: PagedResultDto<RecipeListDto>;
}

export const initialState: State = {
    loading: false,
    error: null,
    getRecipesInput: null,
    recipes: null
};

export const reducer = createReducer(
    initialState,
    on(PublicActions.loadRecipes, (state, { input }) => {
        return {
            ...state,
            loading: true,
            error: null,
            getRecipesInput: input
        }
    }),
    on(PublicActions.loadRecipesSuccess, (state, { recipes }) => {
        return {
            ...state,
            loading: false,
            recipes
        }
    }),
    on(PublicActions.loadRecipesFailure, (state, { error }) => {
        return {
            ...state,
            loading: false,
            error
        }
    }),
);
