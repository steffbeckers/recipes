import { ToasterService } from '@abp/ng.theme.shared';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AdminCategoriesActions from 'src/app/admin/categories/store/actions/categories.actions';
import * as AdminRecipesActions from 'src/app/admin/recipes/store/actions/recipes.actions';

import * as AppActions from '../actions/app.actions';

@Injectable()
export class AppEffects {
    constructor(private actions$: Actions, private toasterService: ToasterService) {}

    showNotification$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AppActions.showNotification)
                // TODO: Enable to test
                // tap(({ message, title, severity, options }) =>
                //     this.toasterService.show(message, title, severity, options)
                // )
            ),
        { dispatch: false }
    );

    showDataLoadedNotification$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    AdminCategoriesActions.listDataLoaded,
                    AdminCategoriesActions.lookupDataLoaded,
                    AdminRecipesActions.listDataLoaded,
                    AdminRecipesActions.detailDataLoaded
                )
                // TODO: Enable to test
                // mapTo(
                //     AppActions.showNotification({
                //         message: '::DataLoaded',
                //         severity: 'info',
                //     })
                // )
            ),
        { dispatch: false }
    );
}
