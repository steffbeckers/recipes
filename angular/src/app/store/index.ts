import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';

export interface State {
    router: RouterReducerState<any>;
}

export const reducers: ActionReducerMap<State> = {
    router: routerReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
