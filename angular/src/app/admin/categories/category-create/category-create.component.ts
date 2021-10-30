import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromCategories from '../store';
import * as CategoriesActions from '../store/actions/categories.actions';

@Component({
    selector: 'app-admin-category-create',
    templateUrl: './category-create.component.html',
    styleUrls: ['./category-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryCreateComponent {
    form: FormGroup = this.fb.group({
        name: [null, [Validators.required]],
        description: [null],
        sortOrder: [null],
    });

    constructor(private fb: FormBuilder, private store: Store<fromCategories.State>) {}

    save(event): void {
        event?.preventDefault();

        this.store.dispatch(CategoriesActions.createFormSubmitted({ form: this.form }));
    }
}
