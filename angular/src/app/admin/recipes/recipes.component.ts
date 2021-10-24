import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RecipeListInputDto } from '@proxy/recipes';

import * as RecipesActions from '../store/actions/recipes.actions';
import * as fromRecipes from '../store/reducers/recipes.reducer';

@Component({
    selector: 'app-admin-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
    listInput: RecipeListInputDto = { maxResultCount: 10 };

    constructor(private store$: Store<fromRecipes.State>) {}

    ngOnInit(): void {
        this.store$.dispatch(RecipesActions.pageLoaded());
    }
}
