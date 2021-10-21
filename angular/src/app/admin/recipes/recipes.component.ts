import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as RecipesActions from '../store/actions/recipes.actions';
import * as fromRecipes from '../store/reducers';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
    constructor(private store: Store<fromRecipes.AdminFeatureState>) {}

    ngOnInit(): void {
        this.store.dispatch(RecipesActions.loadRecipes({ input: { maxResultCount: 10 }}));
    }
}
