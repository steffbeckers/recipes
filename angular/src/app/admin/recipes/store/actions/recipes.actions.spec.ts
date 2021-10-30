import * as fromRecipes from './recipes.actions';

describe('listPageLoaded', () => {
    it('should return an action', () => {
        expect(fromRecipes.listPageLoaded().type).toBe('[Admin/Recipes] List page loaded');
    });
});
