import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CategoriesService } from '@proxy/categories';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { selectCategoriesListInput } from '..';
import * as RecipesActions from '../../../recipes/store/actions/recipes.actions';
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
            ofType(CategoriesActions.listPageLoaded, CategoriesActions.listPaginationChanged),
            concatLatestFrom(() => this.store$.select(selectCategoriesListInput)),
            exhaustMap(([_, input]) =>
                this.categoriesService.getList(input).pipe(
                    map(data => CategoriesActions.listDataLoaded({ data })),
                    catchError(error => of(CategoriesActions.listDataLoadFailed({ error })))
                )
            )
        )
    );

    loadCategoriesLookup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipesActions.createPageLoaded, RecipesActions.detailPageLoaded),
            exhaustMap(() =>
                this.categoriesService.getLookup({ maxResultCount: 10 }).pipe(
                    map(data => CategoriesActions.lookupDataLoaded({ data })),
                    catchError(error => of(CategoriesActions.lookupDataLoadFailed({ error })))
                )
            )
        )
    );
}
