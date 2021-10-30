import { ToasterService } from '@abp/ng.theme.shared';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mapTo, tap } from 'rxjs/operators';

import * as AppActions from '../actions/app.actions';
import * as AdminCategoriesActions from 'src/app/admin/categories/store/actions/categories.actions';
import * as AdminRecipesActions from 'src/app/admin/recipes/store/actions/recipes.actions';

@Injectable()
export class AppEffects {
    constructor(private actions$: Actions, private toasterService: ToasterService) {}

    showNotification$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AppActions.showNotification),
                tap(({ message, title, severity, options }) =>
                    this.toasterService.show(message, title, severity, options)
                )
            ),
        { dispatch: false }
    );

    showDataLoadedNotification$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                AdminCategoriesActions.listDataLoaded,
                AdminCategoriesActions.lookupDataLoaded,
                AdminRecipesActions.listDataLoaded,
                AdminRecipesActions.detailDataLoaded
            ),
            mapTo(AppActions.showNotification({ message: '::DataLoaded', severity: 'info' }))
        )
    );
}
