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
    });

    constructor(private fb: FormBuilder, private store: Store<fromCategories.State>) {}

    ngOnInit(): void {
        this.store.dispatch(CategoriesActions.createPageLoaded());
    }

    formSubmitted(event): void {
        event?.preventDefault();

        if (this.form.invalid) {
            return;
        }

        const formValue = this.form.getRawValue();

        let input: CategoryCreateInputDto = {
            name: formValue.name,
            photo: null,
        };

        this.store.dispatch(CategoriesActions.createCategory({ input }));
    }
}
