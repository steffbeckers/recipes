import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { RecipesService } from '@proxy/recipes';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as RecipesActions from '../actions/recipes.actions';
import * as fromRecipes from '../reducers/recipes.reducer';

@Injectable()
export class RecipesEffects {
    constructor(
        private actions$: Actions,
        private recipesService: RecipesService,
        private store$: Store<fromRecipes.State>
    ) {}

    loadRecipes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipesActions.loadRecipes),
            concatLatestFrom(action => this.store$.select(x => x.getListInput)),
            switchMap(([action, input]) =>
                this.recipesService.getList(input).pipe(
                    map(data => RecipesActions.loadRecipesSuccess({ data })),
                    catchError(error => of(RecipesActions.loadRecipesFailure({ error })))
                )
            )
        )
    );
}
