import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FileInputDto } from '@proxy/files';
import { RecipeUpdateInputDto } from '@proxy/recipes';
import { LookupDto } from '@proxy/shared';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { environment } from 'src/environments/environment';

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
    environment = environment;

    form: FormGroup = this.fb.group({
        id: [null, [Validators.required]],
        name: [null, [Validators.required]],
        description: [null],
        categoryId: [null, [Validators.required]],
        ingredients: [null],
        steps: [null],
    });

    photo: FileInputDto = null;
    deletePhoto = false;

    recipe$ = this.store$.select(selectRecipe);

    constructor(private fb: FormBuilder, private store$: Store<fromRecipes.State>) {}

    ngOnInit(): void {
        this.store$.dispatch(RecipesActions.detailPageLoaded());

        this.recipe$.subscribe((recipe: Recipe) => {
            this.form.patchValue(recipe);
            this.form.markAsPristine();
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
            photo: this.photo ? this.photo : null,
            deletePhoto: this.deletePhoto,
            ingredients: formValue.ingredients,
            steps: formValue.steps,
        };

        this.store$.dispatch(RecipesActions.updateRecipe({ id: formValue.id, input }));

        this.deletePhoto = false;
    }

    deleteRecipe(): void {
        this.store$.dispatch(RecipesActions.deleteRecipe({ id: this.form.value.id }));
    }

    async photoSelected(files: File[]): Promise<void> {
        if (!files) {
            return;
        }

        this.deletePhoto = false;

        let photo = files[0];

        if (photo) {
            this.photo = {
                name: photo.name,
                contentType: photo.type,
                // TODO: Is there a better solution to convert the array buffer to base64 string?
                data: btoa(
                    new Uint8Array(await photo.arrayBuffer()).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                    )
                ),
            };
        } else {
            this.photo = null;
        }
    }
}
