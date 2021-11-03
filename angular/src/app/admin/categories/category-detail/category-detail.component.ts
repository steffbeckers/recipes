import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CategoryUpdateInputDto } from '@proxy/categories';
import { FileInputDto } from '@proxy/files';
import { Category } from 'src/app/shared/models/category.model';
import { environment } from 'src/environments/environment';

import * as fromCategories from '../store';
import { selectCategory } from '../store';
import * as CategoriesActions from '../store/actions/categories.actions';

@Component({
    selector: 'app-admin-category-detail',
    templateUrl: './category-detail.component.html',
    styleUrls: ['./category-detail.component.scss'],
})
export class CategoryDetailComponent implements OnInit {
    environment = environment;

    form: FormGroup = this.fb.group({
        id: [null, [Validators.required]],
        name: [null, [Validators.required]],
        description: [null],
        sortOrder: [null],
    });

    photo: FileInputDto = null;
    deletePhoto = false;

    category$ = this.store$.select(selectCategory);

    constructor(private fb: FormBuilder, private store$: Store<fromCategories.State>) {}

    ngOnInit(): void {
        this.store$.dispatch(CategoriesActions.detailPageLoaded());

        this.category$.subscribe((category: Category) => {
            this.form.patchValue(category);
            this.form.markAsPristine();
        });
    }

    formSubmitted(event): void {
        event?.preventDefault();

        if (this.form.invalid) {
            return;
        }

        const formValue = this.form.getRawValue();

        let input: CategoryUpdateInputDto = {
            name: formValue.name,
            description: formValue.description,
            sortOrder: formValue.sortOrder,
            photo: this.photo ? this.photo : null,
            deletePhoto: this.deletePhoto,
        };

        this.store$.dispatch(CategoriesActions.updateCategory({ id: formValue.id, input }));

        this.deletePhoto = false;
    }

    deleteCategory(): void {
        this.store$.dispatch(CategoriesActions.deleteCategory({ id: this.form.value.id }));
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
