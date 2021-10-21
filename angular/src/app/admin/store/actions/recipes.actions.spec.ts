import * as fromRecipes from './recipes.actions';

describe('loadRecipes', () => {
  it('should return an action', () => {
    expect(fromRecipes.loadRecipes().type).toBe('[Recipes] Load Recipes');
  });
});
