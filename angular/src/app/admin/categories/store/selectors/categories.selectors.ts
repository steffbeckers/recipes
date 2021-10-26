import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromCategories from '../reducers/categories.reducer';

export const selectCategoriesState = createFeatureSelector<fromCategories.State>(
    fromCategories.categoriesFeatureKey
);

export const selectListInput = createSelector(
    selectCategoriesState,
    (state: fromCategories.State) => state.listInput
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
    fromCategories.adapter.getSelectors(selectCategoriesState);
