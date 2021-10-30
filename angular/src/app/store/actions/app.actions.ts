import { Toaster } from '@abp/ng.theme.shared';
import { createAction, props } from '@ngrx/store';

export const showNotification = createAction(
    '[App] Show notification',
    props<{
        message: string;
        title?: string;
        severity?: Toaster.Severity;
        options?: Toaster.ToastOptions;
    }>()
);
