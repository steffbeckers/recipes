import { createFeatureSelector } from '@ngrx/store';
import { State } from '../reducers/admin.reducer';

export const adminFeatureKey = 'admin';

export const selectAdminState = createFeatureSelector<State>(adminFeatureKey);
