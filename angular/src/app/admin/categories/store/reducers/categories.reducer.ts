import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Category } from 'src/app/shared/models/category.model';

import * as CategoriesActions from '../actions/categories.actions';
import * as RecipesActions from '../../../recipes/store/actions/recipes.actions';

export const categoriesFeatureKey = 'categories';

export interface State extends EntityState<Category> {
    loading: boolean;
    error: string;
    totalCount: number;
    pages: number[];
    itemsPerPage: number;
    currentPage: number;
    pageContents: { [page: number]: string[] };
}

export const adapter: EntityAdapter<Category> = createEntityAdapter<Category>();

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
    on(CategoriesActions.listPageLoaded, state => {
        return {
            ...state,
            loading: true,
        };
    }),
    on(CategoriesActions.listPaginationChanged, (state, { currentPage, itemsPerPage }) => {
        return {
            ...state,
            currentPage: currentPage != null ? +currentPage : state.currentPage,
            itemsPerPage: itemsPerPage != null ? +itemsPerPage : state.itemsPerPage,
        };
    }),
    on(CategoriesActions.listDataLoaded, (state, { data }) => {
        let pages = Array(Math.ceil(data.totalCount / state.itemsPerPage))
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
                    photoId: x.photo?.id,
                } as Category;
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
    on(CategoriesActions.listDataLoadFailed, (state, { error }) => {
        return {
            ...state,
            loading: false,
            error,
        };
    }),
    on(CategoriesActions.detailPageLoaded, state => {
        return {
            ...state,
            loading: true,
        };
    }),
    on(CategoriesActions.detailDataLoaded, (state, { data }) => {
        return adapter.upsertOne({ ...data } as Category, {
            ...state,
            loading: false,
            error: null,
        });
    }),
    on(CategoriesActions.detailDataLoadFailed, (state, { error }) => {
        return {
            ...state,
            loading: false,
            error,
        };
    }),
    on(CategoriesActions.createCategory, state => {
        return {
            ...state,
            loading: true,
        };
    }),
    on(CategoriesActions.categoryCreated, (state, { data }) => {
        return adapter.addOne({ ...data } as Category, {
            ...state,
            loading: false,
            error: null,
        });
    }),
    on(CategoriesActions.categoryCreationFailed, (state, { error }) => {
        return {
            ...state,
            loading: false,
            error,
        };
    }),
    on(CategoriesActions.updateCategory, state => {
        return {
            ...state,
            loading: true,
        };
    }),
    on(CategoriesActions.categoryUpdated, (state, { data }) => {
        return adapter.upsertOne({ ...data } as Category, {
            ...state,
            loading: false,
            error: null,
        });
    }),
    on(CategoriesActions.categoryUpdateFailed, (state, { error }) => {
        return {
            ...state,
            loading: false,
            error,
        };
    }),
    on(CategoriesActions.deleteCategory, state => {
        return {
            ...state,
            loading: true,
        };
    }),
    on(CategoriesActions.categoryDeleted, (state, { id }) => {
        return adapter.removeOne(id, {
            ...state,
            loading: false,
            error: null,
        });
    }),
    on(CategoriesActions.categoryDeletionFailed, (state, { error }) => {
        return {
            ...state,
            loading: false,
            error,
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
