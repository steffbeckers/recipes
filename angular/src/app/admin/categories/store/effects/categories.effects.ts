import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CategoriesService, CategoryDto } from '@proxy/categories';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { RealtimeService } from 'src/app/shared/services/realtime.service';
import * as AppActions from 'src/app/store/actions/app.actions';
import { selectRouteParam } from 'src/app/store/selectors/router.selectors';

import { selectCategoriesListInput } from '..';
import * as CategoriesActions from '../actions/categories.actions';
import * as fromCategories from '../reducers/categories.reducer';

@Injectable()
export class CategoriesEffects {
    constructor(
        private store$: Store<fromCategories.State>,
        private actions$: Actions,
        private categoriesService: CategoriesService,
        private realtimeService: RealtimeService
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
            ofType(CategoriesActions.createCategory),
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

    updateCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CategoriesActions.updateCategory),
            switchMap(({ id, input }) =>
                this.categoriesService.update(id, input).pipe(
                    mergeMap(data => [
                        CategoriesActions.categoryUpdated({ data }),
                        AppActions.showNotification({ message: '::CategoryUpdated' }),
                    ]),
                    catchError(error => of(CategoriesActions.categoryUpdateFailed({ error })))
                )
            )
        )
    );

    deleteCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CategoriesActions.deleteCategory),
            switchMap(({ id }) =>
                this.categoriesService.delete(id).pipe(
                    mergeMap(() => [
                        CategoriesActions.categoryDeleted({ id }),
                        AppActions.showNotification({ message: '::CategoryDeleted' }),
                    ]),
                    catchError(error => of(CategoriesActions.categoryDeletionFailed({ error })))
                )
            )
        )
    );

    realtimeCreated$ = createEffect(() =>
        this.realtimeService
            .on<CategoryDto>('CategoryCreated')
            .pipe(map(category => CategoriesActions.categoryCreated({ data: category })))
    );

    realtimeUpdated$ = createEffect(() =>
        this.realtimeService
            .on<CategoryDto>('CategoryUpdated')
            .pipe(map(category => CategoriesActions.categoryUpdated({ data: category })))
    );

    realtimeDeleted$ = createEffect(() =>
        this.realtimeService
            .on<string>('CategoryDeleted')
            .pipe(map(categoryId => CategoriesActions.categoryDeleted({ id: categoryId })))
    );
}
