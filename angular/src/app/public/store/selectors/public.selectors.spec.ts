import * as fromPublic from '../reducers/public.reducer';
import { selectPublicState } from './public.selectors';

describe('Public Selectors', () => {
  it('should select the feature state', () => {
    const result = selectPublicState({
      [fromPublic.publicFeatureKey]: {}
    });

    expect(result).toEqual({loading: false, error: null, getRecipesInput: null, recipes: null});
  });
});
