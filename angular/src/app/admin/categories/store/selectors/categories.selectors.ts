import { createSelector } from '@ngrx/store';
import { CategoryListInputDto } from '@proxy/categories';
import { selectAdminState } from 'src/app/admin/store/selectors/admin.selectors';
import { Category } from 'src/app/shared/models/category.model';
import { selectRouteParams } from 'src/app/store/selectors/router.selectors';

import * as fromAdmin from '../../../store/reducers/admin.reducer';
import * as fromCategories from '../reducers/categories.reducer';

export const selectCategoriesState = createSelector(
    selectAdminState,
    (state: fromAdmin.State) => state.categories
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
    fromCategories.adapter.getSelectors(selectCategoriesState);

export const selectCategories = selectAll;

export const selectCategoriesTotalCount = createSelector(
    selectCategoriesState,
    (state: fromCategories.State) => state.totalCount
);

export const selectCategoriesList = createSelector(
    selectCategoriesState,
    selectCategories,
    (state: fromCategories.State, categories: Category[]) => {
        return categories.filter(x => state.pageContents[state.currentPage]?.includes(x.id));
    }
);

export const selectCategoriesListInput = createSelector(
    selectCategoriesState,
    (state: fromCategories.State) => {
        return {
            maxResultCount: state.itemsPerPage,
            skipCount: (state.currentPage - 1) * state.itemsPerPage,
        } as CategoryListInputDto;
    }
);

export const selectCategoriesListPagination = createSelector(
    selectCategoriesState,
    (state: fromCategories.State) => {
        return {
            pages: state.pages,
            currentPage: state.currentPage,
            itemsPerPage: state.itemsPerPage,
            totalCount: state.totalCount,
        };
    }
);

export const selectCategory = createSelector(
    selectEntities,
    selectRouteParams,
    (categories, { id }) => categories[id]
);
