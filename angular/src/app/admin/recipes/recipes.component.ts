import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as RecipesActions from './store/actions/recipes.actions';
import * as fromAdmin from '../store/reducers/admin.reducer';
import { selectRecipesWithCategory } from './store';

@Component({
    selector: 'app-admin-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
    recipes$ = this.store$.select(selectRecipesWithCategory);

    constructor(private store$: Store<fromAdmin.State>) {}

    ngOnInit(): void {
        this.store$.dispatch(RecipesActions.listPageLoaded());
    }
}
