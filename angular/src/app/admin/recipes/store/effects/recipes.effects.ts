import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { RecipesService } from '@proxy/recipes';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as RecipesActions from '../actions/recipes.actions';
import * as fromRecipes from '../reducers/recipes.reducer';
import { selectListInput } from '../selectors/recipes.selectors';

@Injectable()
export class RecipesEffects {
    constructor(
        private store$: Store<fromRecipes.State>,
        private actions$: Actions,
        private recipesService: RecipesService
    ) {}

    loadRecipes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipesActions.pageLoaded, RecipesActions.listInputChanged),
            concatLatestFrom(() => this.store$.select(selectListInput)),
            switchMap(([_, input]) =>
                this.recipesService.getList(input).pipe(
                    map(data => RecipesActions.listDataLoaded({ data })),
                    catchError(error => of(RecipesActions.listDataLoadFailed({ error })))
                )
            )
        )
    );
}
