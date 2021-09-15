import * as fromPublic from './public.actions';

describe('loadRecipes', () => {
  it('should return an action', () => {
    expect(fromPublic.loadRecipes({ input: { maxResultCount: 10 } }).type).toBe('[Public] Load Recipes');
  });
});
