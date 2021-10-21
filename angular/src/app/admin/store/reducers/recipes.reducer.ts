import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Recipe } from 'src/app/shared/recipe.model';

import * as RecipesActions from '../actions/recipes.actions';

export const recipesFeatureKey = 'recipes';

export interface State extends EntityState<Recipe> {};

export const adapter: EntityAdapter<Recipe> = createEntityAdapter<Recipe>({});

export const initialState: State = adapter.getInitialState({});

export const reducer = createReducer(
    initialState,
    on(RecipesActions.loadRecipes, state => state),
    on(RecipesActions.loadRecipesSuccess, (state, { data }) => {
        return adapter.upsertMany(data.items, state)
    }),
    on(RecipesActions.loadRecipesFailure, (state, action) => state),
);
