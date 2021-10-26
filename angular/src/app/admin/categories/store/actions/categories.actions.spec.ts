import * as fromCategories from './categories.actions';

describe('pageLoaded', () => {
    it('should return an action', () => {
        expect(fromCategories.pageLoaded().type).toBe('[Admin/Categories] Page loaded');
    });
});
