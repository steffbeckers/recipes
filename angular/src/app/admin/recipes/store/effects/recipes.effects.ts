import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { RecipesService } from '@proxy/recipes';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { selectRouteParam } from 'src/app/store/selectors/router.selectors';

import * as RecipesActions from '../actions/recipes.actions';

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
                    map(data => RecipesActions.listDataLoaded({ data })),
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
            ofType(RecipesActions.createFormSubmitted),
            switchMap(({ input }) => {
                return this.recipesService.create(input).pipe(
                    map(data => RecipesActions.recipeCreated({ data })),
                    catchError(error => of(RecipesActions.recipeCreationFailed({ error })))
                );
            })
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
}
