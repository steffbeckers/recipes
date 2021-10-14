import { PagedResultDto } from '@abp/ng.core';
import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { RecipeListDto, RecipeListInputDto } from '@proxy/recipes';

import * as PublicActions from '../actions/public.actions';

export const publicFeatureKey = 'public';

export interface State {
    loading: boolean;
    error: any;
    recipesListInput: RecipeListInputDto;
    recipes: PagedResultDto<RecipeListDto>;
}

export const initialState: State = {
    loading: false,
    error: null,
    recipesListInput: null,
    recipes: null
};

export const reducer = createReducer(
    initialState,
    on(PublicActions.loadRecipes, (state, { input }) => {
        return {
            ...state,
            loading: true,
            error: null,
            recipesListInput: input
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
