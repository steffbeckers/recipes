import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CategoriesService } from '@proxy/categories';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { selectListInput } from '..';
import * as CategoriesActions from '../actions/categories.actions';
import * as fromCategories from '../reducers/categories.reducer';

@Injectable()
export class CategoriesEffects {
    constructor(
        private store$: Store<fromCategories.State>,
        private actions$: Actions,
        private categoriesService: CategoriesService
    ) {}

    loadCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CategoriesActions.pageLoaded),
            concatLatestFrom(() => this.store$.select(selectListInput)),
            switchMap(([_, input]) =>
                this.categoriesService.getList(input).pipe(
                    map(data => CategoriesActions.listDataLoaded({ data })),
                    catchError(error => of(CategoriesActions.listDataLoadFailed({ error })))
                )
            )
        )
    );
}
