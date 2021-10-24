import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RecipesService } from '@proxy/recipes';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as RecipesActions from '../actions/recipes.actions';

@Injectable()
export class RecipesEffects {
    constructor(private actions$: Actions, private recipesService: RecipesService) {}

    loadRecipes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipesActions.pageLoaded),
            switchMap(() =>
                this.recipesService.getList({ maxResultCount: 10 }).pipe(
                    map(data => RecipesActions.listDataLoaded({ data })),
                    catchError(error => of(RecipesActions.listDataLoadFailed({ error })))
                )
            )
        )
    );
}
