import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { selectAll } from '../../categories/store/selectors/categories.selectors';
import * as fromRecipes from '../store';
import * as RecipesActions from '../store/actions/recipes.actions';

@Component({
    selector: 'app-admin-recipe-create',
    templateUrl: './recipe-create.component.html',
    styleUrls: ['./recipe-create.component.scss'],
})
export class RecipeCreateComponent implements OnInit {
    form: FormGroup = this.fb.group({
        name: [null, [Validators.required]],
        description: [null],
        categoryId: [null, [Validators.required]],
    });

    categories$ = this.store.select(selectAll);

    constructor(private fb: FormBuilder, private store: Store<fromRecipes.State>) {}

    ngOnInit(): void {
        this.store.dispatch(RecipesActions.createPageLoaded());
    }

    save(event): void {
        event?.preventDefault();

        this.store.dispatch(RecipesActions.createFormSubmitted({ form: this.form }));
    }
}
