import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CategoryCreateInputDto } from '@proxy/categories';
import { first, tap } from 'rxjs/operators';

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

    constructor(
        private fb: FormBuilder,
        private store$: Store<fromCategories.State>,
        private actions$: Actions,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.store$.dispatch(CategoriesActions.createPageLoaded());

        this.actions$
            .pipe(
                ofType(CategoriesActions.categoryCreated),
                first(),
                tap(({ data }) => {
                    this.router.navigateByUrl(`/admin/categories/${data.id}`);
                })
            )
            .subscribe();
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

        this.store$.dispatch(CategoriesActions.createCategory({ input }));
    }
}
