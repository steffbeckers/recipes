import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CategoryUpdateInputDto } from '@proxy/categories';
import { Category } from 'src/app/shared/models/category.model';

import * as fromCategories from '../store';
import { selectCategory } from '../store';
import * as CategoriesActions from '../store/actions/categories.actions';

@Component({
    selector: 'app-admin-category-detail',
    templateUrl: './category-detail.component.html',
    styleUrls: ['./category-detail.component.scss'],
})
export class CategoryDetailComponent implements OnInit {
    form: FormGroup = this.fb.group({
        id: [null, [Validators.required]],
        name: [null, [Validators.required]],
        description: [null],
        sortOrder: [null],
        photo: [null],
    });

    category$ = this.store$.select(selectCategory);

    constructor(private fb: FormBuilder, private store$: Store<fromCategories.State>) {}

    ngOnInit(): void {
        this.store$.dispatch(CategoriesActions.detailPageLoaded());

        this.category$.subscribe((category: Category) => {
            this.form.patchValue(category);
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
            photo: null,
            deletePhoto: false,
        };

        this.store$.dispatch(CategoriesActions.updateCategory({ id: formValue.id, input }));
    }

    deleteCategory(): void {
        this.store$.dispatch(CategoriesActions.deleteCategory({ id: this.form.value.id }));
    }
}
