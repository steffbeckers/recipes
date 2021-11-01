import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Recipe } from 'src/app/shared/models/recipe.model';

import * as RecipesActions from '../actions/recipes.actions';

export const recipesFeatureKey = 'recipes';

export interface State extends EntityState<Recipe> {
    loading: boolean;
    error: string;
    totalCount: number;
    pages: number[];
    itemsPerPage: number;
    currentPage: number;
    pageContents: { [page: number]: string[] };
}

export const adapter: EntityAdapter<Recipe> = createEntityAdapter<Recipe>();

export const initialState: State = adapter.getInitialState({
    loading: false,
    error: null,
    totalCount: null,
    pages: [],
    itemsPerPage: 5,
    currentPage: 1,
    pageContents: {},
});

export const reducer = createReducer(
    initialState,
    on(RecipesActions.listPageLoaded, state => {
        return {
            ...state,
            loading: true,
        };
    }),
    on(RecipesActions.listDataLoaded, (state, { data }) => {
        let pages = Array(Math.ceil(data.totalCount / data.items.length))
            .fill(1)
            .map((_, i) => i + 1);

        let pageContents = { ...state.pageContents };
        pageContents[state.currentPage] = data.items.map(x => x.id);

        return adapter.upsertMany(
            data.items.map(x => {
                return {
                    id: x.id,
                    name: x.name,
                    description: x.description,
                    categoryId: x.categoryId,
                    forAmount: x.forAmount,
                    forUnit: x.forUnit,
                    photoId: x.photo?.id,
                } as Recipe;
            }),
            {
                ...state,
                loading: false,
                error: null,
                totalCount: data.totalCount,
                pages,
                pageContents,
            }
        );
    }),
    on(RecipesActions.listDataLoadFailed, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
        };
    }),
    on(RecipesActions.detailPageLoaded, state => {
        return {
            ...state,
            loading: true,
        };
    }),
    on(RecipesActions.detailDataLoaded, (state, { data }) => {
        return adapter.upsertOne({ ...data } as Recipe, {
            ...state,
            loading: false,
            error: null,
        });
    }),
    on(RecipesActions.detailDataLoadFailed, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
        };
    }),
    on(RecipesActions.recipeCreated, (state, { data }) => {
        return adapter.addOne({ ...data } as Recipe, state);
    })
);
