import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from 'src/app/shared/recipe.model';

import * as fromCategories from '../categories/store';
import * as fromRecipes from './store';
import * as RecipesActions from './store/actions/recipes.actions';

@Component({
    selector: 'app-admin-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
    listInput$ = this.store$.select(fromRecipes.selectListInput);

    recipes$ = combineLatest([
        this.store$.select(fromRecipes.selectAll),
        this.store$.select(fromCategories.selectAll),
    ]).pipe(
        map(([recipes, categories]) => {
            return recipes.map(recipe => {
                return {
                    ...recipe,
                    category: categories.find(x => x.id == recipe.categoryId),
                } as Recipe;
            });
        })
    );

    constructor(private store$: Store<fromRecipes.State>) {}

    ngOnInit(): void {
        this.store$.dispatch(RecipesActions.pageLoaded());
    }

    // TODO: Test input changed dispatch
    testListInputChange(): void {
        this.store$.dispatch(RecipesActions.listInputChanged({ input: { maxResultCount: 2 } }));
    }
}
