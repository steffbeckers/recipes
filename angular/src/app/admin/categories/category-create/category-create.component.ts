import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CategoryCreateInputDto } from '@proxy/categories';

import * as fromCategories from '../store';
import * as CategoriesActions from '../store/actions/categories.actions';

@Component({
    selector: 'app-admin-category-create',
    templateUrl: './category-create.component.html',
    styleUrls: ['./category-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryCreateComponent implements OnInit {
    form: FormGroup = this.fb.group({
        name: [null, [Validators.required]],
        description: [null],
        sortOrder: [1],
        photo: [null],
    });

    constructor(private fb: FormBuilder, private store: Store<fromCategories.State>) {}

    ngOnInit(): void {
        this.store.dispatch(CategoriesActions.createPageLoaded());
    }

    save(event): void {
        event?.preventDefault();

        if (this.form.invalid) {
            return;
        }

        const formValue = this.form.getRawValue();

        let input: CategoryCreateInputDto = {
            name: formValue.name,
            description: formValue.description,
            sortOrder: formValue.sortOrder,
            photo: formValue.photo,
        };

        this.store.dispatch(CategoriesActions.createFormSubmitted({ input }));
    }

    async photoSelected(files: File[]): Promise<void> {
        if (!files) {
            return;
        }

        let photo = files[0];

        if (photo) {
            this.form.patchValue({
                photo: {
                    name: photo.name,
                    contentType: photo.type,
                    // TODO: Is there a better solution to convert the array buffer to base64 string?
                    data: btoa(
                        new Uint8Array(await photo.arrayBuffer()).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    ),
                },
            });
        } else {
            this.form.patchValue({ photo: null });
        }
    }
}
