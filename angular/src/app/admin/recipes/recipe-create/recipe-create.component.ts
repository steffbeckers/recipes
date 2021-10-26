import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromRecipes from '../store';
import * as RecipesActions from '../store/actions/recipes.actions';

@Component({
    selector: 'app-admin-recipe-create',
    templateUrl: './recipe-create.component.html',
    styleUrls: ['./recipe-create.component.scss'],
})
export class RecipeCreateComponent {
    form: FormGroup = this.fb.group({
        name: [null, [Validators.required]],
        description: [null],
    });

    constructor(private fb: FormBuilder, private store: Store<fromRecipes.State>) {}

    save(event): void {
        event.preventDefault();

        this.store.dispatch(RecipesActions.createFormSubmitted({ form: this.form }));
    }
}
