import * as fromCategories from '../reducers/categories.reducer';
import { selectCategoriesState } from './categories.selectors';

describe('Categories Selectors', () => {
    it('should select the feature state', () => {
        const result = selectCategoriesState({
            [fromCategories.categoriesFeatureKey]: {},
        });

        expect(result).toEqual({});
    });
});
