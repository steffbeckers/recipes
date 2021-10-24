import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as RecipesActions from './store/actions/recipes.actions';
import * as fromRecipes from './store/reducers/recipes.reducer';
import { selectListInput } from './store/selectors/recipes.selectors';

@Component({
    selector: 'app-admin-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
    listInput$ = this.store$.select(selectListInput);

    constructor(private store$: Store<fromRecipes.State>) {}

    ngOnInit(): void {
        this.store$.dispatch(RecipesActions.pageLoaded());
    }

    // TODO: Test input changed dispatch
    testListInputChange(): void {
        this.store$.dispatch(RecipesActions.listInputChanged({ input: { maxResultCount: 2 } }));
    }
}
