import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RecipesService } from '@proxy/recipes';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as RecipesActions from '../actions/recipes.actions';

@Injectable()
export class RecipesEffects {
    constructor(private actions$: Actions, private recipesService: RecipesService) {}

    loadRecipes$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RecipesActions.loadRecipes),
            switchMap(({ input }) =>
                this.recipesService.getList(input).pipe(
                    map(data => RecipesActions.loadRecipesSuccess({ data })),
                    catchError(error => of(RecipesActions.loadRecipesFailure({ error })))
                )
            )
        );
    });
}
