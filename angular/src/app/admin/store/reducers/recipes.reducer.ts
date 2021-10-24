import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { RecipeListInputDto } from '@proxy/recipes';
import { Recipe } from 'src/app/shared/recipe.model';

import * as RecipesActions from '../actions/recipes.actions';

export const recipesFeatureKey = 'recipes';

export interface State extends EntityState<Recipe> {
    getListInput: RecipeListInputDto;
}

export const adapter: EntityAdapter<Recipe> = createEntityAdapter<Recipe>({});

export const initialState: State = adapter.getInitialState({
    ids: [],
    entities: [],
    getListInput: { maxResultCount: 10 },
});

export const reducer = createReducer(
    initialState,
    on(RecipesActions.pageLoaded, state => state),
    on(RecipesActions.listDataLoaded, (state, { data }) => {
        return adapter.upsertMany(data.items, state);
    }),
    on(RecipesActions.listDataLoadFailed, (state, action) => state)
);
