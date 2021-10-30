import { createSelector } from '@ngrx/store';
import { selectAdminState } from 'src/app/admin/store/selectors/admin.selectors';

import * as fromAdmin from '../../../store/reducers/admin.reducer';
import * as fromCategories from '../reducers/categories.reducer';

export const selectCategoriesState = createSelector(
    selectAdminState,
    (state: fromAdmin.State) => state.categories
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
    fromCategories.adapter.getSelectors(selectCategoriesState);

export const selectCategories = selectAll;

export const selectListInput = createSelector(
    selectCategoriesState,
    (state: fromCategories.State) => state.listInput
);
