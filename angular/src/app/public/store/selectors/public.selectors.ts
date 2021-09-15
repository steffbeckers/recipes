import { createFeatureSelector } from '@ngrx/store';

import * as fromPublic from '../reducers/public.reducer';

export const selectPublicState = createFeatureSelector<fromPublic.State>(
  fromPublic.publicFeatureKey
);
