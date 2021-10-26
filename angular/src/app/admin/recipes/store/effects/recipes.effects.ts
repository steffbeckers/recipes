import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CategoriesService } from '@proxy/categories';
import { RecipeCreateInputDto, RecipesService } from '@proxy/recipes';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import * as CategoriesActions from '../../../categories/store/actions/categories.actions';
import * as RecipesActions from '../actions/recipes.actions';
import * as fromRecipes from '../reducers/recipes.reducer';
import { selectListInput } from '../selectors/recipes.selectors';

@Injectable()
export class RecipesEffects {
    constructor(
        private store$: Store<fromRecipes.State>,
        private actions$: Actions,
        private categoriesService: CategoriesService,
        private recipesService: RecipesService,
        private router: Router
    ) {}

    loadRecipes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipesActions.listPageLoaded, RecipesActions.listInputChanged),
            concatLatestFrom(() => this.store$.select(selectListInput)),
            switchMap(([_, input]) =>
                this.recipesService.getList(input).pipe(
                    map(data => RecipesActions.listDataLoaded({ data })),
                    catchError(error => of(RecipesActions.listDataLoadFailed({ error })))
                )
            )
        )
    );

    loadCategoriesLookup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipesActions.createPageLoaded),
            switchMap(() =>
                this.categoriesService.getLookup({ maxResultCount: 10 }).pipe(
                    map(data => CategoriesActions.lookupDataLoaded({ data })),
                    catchError(error => of(CategoriesActions.lookupDataLoadFailed({ error })))
                )
            )
        )
    );

    createRecipe$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RecipesActions.createFormSubmitted),
            switchMap(({ form }) => {
                if (form.invalid) {
                    return;
                }

                const formValue = form.getRawValue();

                let input: RecipeCreateInputDto = {
                    name: formValue.name,
                    description: formValue.description,
                    categoryId: formValue.categoryId,
                    // TODO
                    photo: null,
                    ingredients: [{ name: 'test', amount: 1 }],
                    steps: [{ number: 1, instructions: 'test' }],
                };

                return this.recipesService.create(input).pipe(
                    map(data => RecipesActions.recipeCreated({ data })),
                    catchError(error => of(RecipesActions.recipeCreationFailed({ error })))
                );
            })
        )
    );

    navigateAfterCreated$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RecipesActions.recipeCreated),
                tap(({ data }) => this.router.navigateByUrl('/admin/recipes/' + data.id))
            ),
        { dispatch: false }
    );
}
