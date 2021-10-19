import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RecipesService } from '@proxy/recipes';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as PublicActions from '../actions/public.actions';

@Injectable()
export class PublicEffects {
  constructor(private actions$: Actions, private recipesService: RecipesService) {}

  loadRecipes$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(PublicActions.loadRecipes),
      switchMap(({input}) =>
        this.recipesService.getList(input).pipe(
          map(recipes => PublicActions.loadRecipesSuccess({ recipes })),
          catchError(error => of(PublicActions.loadRecipesFailure({ error })))
        )
      )
    );
  });
}
