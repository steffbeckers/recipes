import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RecipeUpdateInputDto } from '@proxy/recipes';
import { LookupDto } from '@proxy/shared';
import { Recipe } from 'src/app/shared/models/recipe.model';

import * as fromRecipes from '../store';
import { selectRecipe } from '../store';
import * as RecipesActions from '../store/actions/recipes.actions';

@Component({
    selector: 'app-admin-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailComponent implements OnInit {
    form: FormGroup = this.fb.group({
        id: [null, [Validators.required]],
        name: [null, [Validators.required]],
        description: [null],
        categoryId: [null, [Validators.required]],
    });

    recipe$ = this.store.select(selectRecipe);

    constructor(private fb: FormBuilder, private store: Store<fromRecipes.State>) {}

    ngOnInit(): void {
        this.store.dispatch(RecipesActions.detailPageLoaded());

        this.recipe$.subscribe((recipe: Recipe) => {
            this.form.patchValue(recipe);
        });
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

        let input: RecipeUpdateInputDto = {
            name: formValue.name,
            description: formValue.description,
            categoryId: formValue.categoryId,
            // TODO
            photo: null,
            deletePhoto: false,
            ingredients: [{ name: 'test', amount: 1 }],
            steps: [{ number: 1, instructions: 'test' }],
        };

        this.store.dispatch(RecipesActions.updateFormSubmitted({ id: formValue.id, input }));
    }
}
