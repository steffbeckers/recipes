import * as fromCategories from './categories.actions';

describe('listPageLoaded', () => {
    it('should return an action', () => {
        expect(fromCategories.listPageLoaded().type).toBe('[Admin/Categories] List page loaded');
    });
});
