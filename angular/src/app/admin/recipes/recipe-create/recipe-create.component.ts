import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { RecipeCreateInputDto } from '@proxy/recipes';
import { LookupDto } from '@proxy/shared';
import { first, tap } from 'rxjs/operators';

import * as fromRecipes from '../store';
import * as RecipesActions from '../store/actions/recipes.actions';

@Component({
    selector: 'app-admin-recipe-create',
    templateUrl: './recipe-create.component.html',
    styleUrls: ['./recipe-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCreateComponent implements OnInit {
    form: FormGroup = this.fb.group({
        name: [null, [Validators.required]],
        categoryId: [null, [Validators.required]],
    });

    constructor(
        private fb: FormBuilder,
        private store$: Store<fromRecipes.State>,
        private actions$: Actions,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.store$.dispatch(RecipesActions.createPageLoaded());

        this.actions$
            .pipe(
                ofType(RecipesActions.recipeCreated),
                first(),
                tap(({ data }) => {
                    this.router.navigateByUrl(`/admin/recipes/${data.id}`);
                })
            )
            .subscribe();
    }

    categorySelected(category: LookupDto<string>): void {
        this.form.patchValue({ categoryId: category.id });
    }

    formSubmitted(event): void {
        event?.preventDefault();

        if (this.form.invalid) {
            return;
        }

        const formValue = this.form.getRawValue();

        let input: RecipeCreateInputDto = {
            name: formValue.name,
            categoryId: formValue.categoryId,
            photo: null,
            ingredients: [],
            steps: [],
        };

        this.store$.dispatch(RecipesActions.createRecipe({ input }));
    }
}
