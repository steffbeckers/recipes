import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CategoryListInputDto } from '@proxy/categories';
import { Category } from 'src/app/shared/models/category.model';

import * as RecipesActions from '../../../recipes/store/actions/recipes.actions';
import * as CategoriesActions from '../actions/categories.actions';

export const categoriesFeatureKey = 'categories';

export interface State extends EntityState<Category> {
    loading: boolean;
    error: string;
    listInput: CategoryListInputDto;
    totalCount: number;
    pages: number[];
    currentPage: number;
}

export const adapter: EntityAdapter<Category> = createEntityAdapter<Category>();

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
    on(CategoriesActions.pageLoaded, state => {
        return {
            ...state,
            loading: true,
        };
    }),
    on(CategoriesActions.listDataLoaded, (state, { data }) => {
        let pages = Array(Math.ceil(data.totalCount / state.listInput.maxResultCount))
            .fill(1)
            .map((_, i) => i + 1);

        return adapter.upsertMany(
            data.items.map(x => {
                return {
                    id: x.id,
                    name: x.name,
                    description: x.description,
                    photoId: x.photo?.id,
                } as Category;
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
    on(CategoriesActions.listDataLoadFailed, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
        };
    }),
    on(CategoriesActions.lookupDataLoaded, (state, { data }) => {
        return adapter.upsertMany(
            data.items.map(x => {
                return {
                    id: x.id,
                    name: x.name,
                } as Category;
            }),
            state
        );
    }),
    on(CategoriesActions.lookupDataLoadFailed, (state, action) => {
        return {
            ...state,
            error: action.error,
        };
    }),
    on(RecipesActions.listDataLoaded, (state, { data }) => {
        let categories: Category[] = data.items.map(x => {
            return {
                id: x.category.id,
                name: x.category.name,
                description: x.category.description,
                photoId: x.category.photo?.id,
            } as Category;
        });

        return adapter.upsertMany(categories, state);
    })
);
