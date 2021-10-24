import * as fromRecipes from './recipes.actions';

describe('pageLoaded', () => {
    it('should return an action', () => {
        expect(fromRecipes.pageLoaded().type).toBe('[Admin/Recipes] Page loaded');
    });
});
