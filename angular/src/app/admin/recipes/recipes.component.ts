import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRecipes from './store';
import * as RecipesActions from './store/actions/recipes.actions';

@Component({
    selector: 'app-admin-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesComponent implements OnInit {
    recipes$ = this.store$.select(fromRecipes.selectRecipesList);
    pagination$ = this.store$.select(fromRecipes.selectRecipesListPagination);
    totalCount$ = this.store$.select(fromRecipes.selectRecipesTotalCount);

    constructor(private store$: Store<fromRecipes.State>) {}

    ngOnInit(): void {
        this.store$.dispatch(RecipesActions.listPageLoaded());
    }

    currentPageChanged(page: number): void {
        this.store$.dispatch(RecipesActions.listPaginationChanged({ currentPage: page }));
    }

    itemsPerPageChanged(count: number): void {
        this.store$.dispatch(RecipesActions.listPaginationChanged({ itemsPerPage: count }));
    }
}
