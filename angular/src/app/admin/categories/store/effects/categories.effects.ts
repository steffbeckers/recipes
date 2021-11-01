import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CategoriesService } from '@proxy/categories';
import { of } from 'rxjs';
import {
    catchError,
    exhaustMap,
    map,
    mergeMap,
    switchMap,
    tap,
    withLatestFrom,
} from 'rxjs/operators';
import { selectRouteParam } from 'src/app/store/selectors/router.selectors';

import { selectCategoriesListInput } from '..';
import * as RecipesActions from '../../../recipes/store/actions/recipes.actions';
import * as CategoriesActions from '../actions/categories.actions';
import * as fromCategories from '../reducers/categories.reducer';
import * as AppActions from 'src/app/store/actions/app.actions';
import { Router } from '@angular/router';

@Injectable()
export class CategoriesEffects {
    constructor(
        private store$: Store<fromCategories.State>,
        private actions$: Actions,
        private categoriesService: CategoriesService,
        private router: Router
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
                this.categoriesService.getLookup({ maxResultCount: 1000 }).pipe(
                    map(data => CategoriesActions.lookupDataLoaded({ data })),
                    catchError(error => of(CategoriesActions.lookupDataLoadFailed({ error })))
                )
            )
        )
    );

    loadCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CategoriesActions.detailPageLoaded),
            withLatestFrom(this.store$.select(selectRouteParam('id')), (_, id) => id),
            exhaustMap(id =>
                this.categoriesService.get(id).pipe(
                    map(data => CategoriesActions.detailDataLoaded({ data })),
                    catchError(error => of(CategoriesActions.detailDataLoadFailed({ error })))
                )
            )
        )
    );

    createCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CategoriesActions.createFormSubmitted),
            switchMap(({ input }) =>
                this.categoriesService.create(input).pipe(
                    mergeMap(data => [
                        CategoriesActions.categoryCreated({ data }),
                        AppActions.showNotification({ message: '::CategoryCreated' }),
                    ]),
                    catchError(error => of(CategoriesActions.categoryCreationFailed({ error })))
                )
            )
        )
    );

    // TODO: Router action needed?
    navigateAfterCreated$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(CategoriesActions.categoryCreated),
                tap(({ data }) => this.router.navigateByUrl('/admin/categories/' + data.id))
            ),
        { dispatch: false }
    );
}
