import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromCategories from './store';
import * as CategoriesActions from './store/actions/categories.actions';

@Component({
    selector: 'app-admin-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent implements OnInit {
    categories$ = this.store$.select(fromCategories.selectAll);

    constructor(private store$: Store<fromCategories.State>) {}

    ngOnInit(): void {
        this.store$.dispatch(CategoriesActions.pageLoaded());
    }
}
