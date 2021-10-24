import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { RecipeListInputDto } from '@proxy/recipes';
import { Recipe } from 'src/app/shared/recipe.model';

import * as RecipesActions from '../actions/recipes.actions';

export const recipesFeatureKey = 'admin.recipes';

export interface State extends EntityState<Recipe> {
    loading: boolean;
    error: string;
    listInput: RecipeListInputDto;
    totalCount: number;
    pages: number[];
    currentPage: number;
}

export const adapter: EntityAdapter<Recipe> = createEntityAdapter<Recipe>({});

export const initialState: State = adapter.getInitialState({
    loading: false,
    error: null,
    listInput: { maxResultCount: 10 },
    totalCount: null,
    pages: [],
    currentPage: null,
});

export const reducer = createReducer(
    initialState,
    on(RecipesActions.pageLoaded, state => {
        return {
            ...state,
            loading: true,
        };
    }),
    on(RecipesActions.listInputChanged, (state, { input }) => {
        return {
            ...state,
            listInput: input,
        };
    }),
    on(RecipesActions.listDataLoaded, (state, { data }) => {
        let pages = Array(Math.ceil(data.totalCount / state.listInput.maxResultCount))
            .fill(1)
            .map((_, i) => i + 1);

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
                currentPage: state.currentPage ? state.currentPage : pages[0] ? pages[0] : null,
            }
        );
    }),
    on(RecipesActions.listDataLoadFailed, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
        };
    })
);
