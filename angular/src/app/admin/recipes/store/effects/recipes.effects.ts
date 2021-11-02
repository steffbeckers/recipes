import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { RecipesService } from '@proxy/recipes';
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

import * as RecipesActions from '../actions/recipes.actions';
import * as AppActions from 'src/app/store/actions/app.actions';

@Injectable()
export class RecipesEffects {
    constructor(
        private actions$: Actions,
        private store$: Store,
        private recipesService: RecipesService,
        private router: Router
    ) {}

    loadRecipes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipesActions.listPageLoaded),
            exhaustMap(() =>
                this.recipesService.getList({ maxResultCount: 10 }).pipe(
                    mergeMap(data => [
                        RecipesActions.listDataLoaded({ data }),
                        AppActions.showNotification({
                            message: '::RecipesLoaded',
                            severity: 'info',
                        }),
                    ]),
                    catchError(error => of(RecipesActions.listDataLoadFailed({ error })))
                )
            )
        )
    );

    loadRecipe$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipesActions.detailPageLoaded),
            withLatestFrom(this.store$.select(selectRouteParam('id')), (_, id) => id),
            exhaustMap(id =>
                this.recipesService.get(id).pipe(
                    map(data => RecipesActions.detailDataLoaded({ data })),
                    catchError(error => of(RecipesActions.detailDataLoadFailed({ error })))
                )
            )
        )
    );

    createRecipe$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipesActions.createRecipe),
            switchMap(({ input }) =>
                this.recipesService.create(input).pipe(
                    mergeMap(data => [
                        RecipesActions.recipeCreated({ data }),
                        AppActions.showNotification({ message: '::RecipeCreated' }),
                    ]),
                    catchError(error => of(RecipesActions.recipeCreationFailed({ error })))
                )
            )
        )
    );

    // TODO: Router action needed?
    navigateAfterCreated$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RecipesActions.recipeCreated),
                tap(({ data }) => this.router.navigateByUrl('/admin/recipes/' + data.id))
            ),
        { dispatch: false }
    );

    updateRecipe$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipesActions.updateRecipe),
            switchMap(({ id, input }) =>
                this.recipesService.update(id, input).pipe(
                    mergeMap(data => [
                        RecipesActions.recipeUpdated({ data }),
                        AppActions.showNotification({ message: '::RecipeUpdated' }),
                    ]),
                    catchError(error => of(RecipesActions.recipeUpdateFailed({ error })))
                )
            )
        )
    );

    // TODO: Router action needed?
    navigateAfterUpdated$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RecipesActions.recipeUpdated),
                tap(({ data }) => this.router.navigateByUrl('/admin/recipes'))
            ),
        { dispatch: false }
    );

    deleteRecipe$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipesActions.deleteRecipe),
            switchMap(({ id }) =>
                this.recipesService.delete(id).pipe(
                    mergeMap(() => [
                        RecipesActions.recipeDeleted({ id }),
                        AppActions.showNotification({ message: '::RecipeDeleted' }),
                    ]),
                    catchError(error => of(RecipesActions.recipeDeletionFailed({ error })))
                )
            )
        )
    );

    // TODO: Router action needed?
    navigateAfterDeleted$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RecipesActions.recipeDeleted),
                tap(() => this.router.navigateByUrl('/admin/recipes'))
            ),
        { dispatch: false }
    );
}
