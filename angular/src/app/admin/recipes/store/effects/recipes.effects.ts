import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { RecipeDto, RecipesService } from '@proxy/recipes';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { selectRouteParam } from 'src/app/store/selectors/router.selectors';

import * as RecipesActions from '../actions/recipes.actions';
import * as AppActions from 'src/app/store/actions/app.actions';
import { selectRecipesListInput } from '..';
import { RealtimeService } from 'src/app/shared/services/realtime.service';

@Injectable()
export class RecipesEffects {
    constructor(
        private actions$: Actions,
        private store$: Store,
        private realtimeService: RealtimeService,
        private recipesService: RecipesService
    ) {}

    loadRecipes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipesActions.listPageLoaded, RecipesActions.listPaginationChanged),
            concatLatestFrom(() => this.store$.select(selectRecipesListInput)),
            exhaustMap(([_, input]) =>
                this.recipesService.getList(input).pipe(
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

    realtimeCreated$ = createEffect(() =>
        this.realtimeService
            .on<RecipeDto>('RecipeCreated')
            .pipe(map(recipe => RecipesActions.recipeCreated({ data: recipe })))
    );

    realtimeUpdated$ = createEffect(() =>
        this.realtimeService
            .on<RecipeDto>('RecipeUpdated')
            .pipe(map(recipe => RecipesActions.recipeUpdated({ data: recipe })))
    );

    realtimeDeleted$ = createEffect(() =>
        this.realtimeService
            .on<string>('RecipeDeleted')
            .pipe(map(recipeId => RecipesActions.recipeDeleted({ id: recipeId })))
    );
}
