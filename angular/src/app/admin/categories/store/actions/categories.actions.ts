import { PagedResultDto } from '@abp/ng.core';
import { FormGroup } from '@angular/forms';
import { createAction, props } from '@ngrx/store';
import { CategoryListDto } from '@proxy/categories';

export const pageLoaded = createAction('[Admin/Categories] Page loaded');
export const listDataLoaded = createAction(
    '[Admin/Categories] List data loaded',
    props<{ data: PagedResultDto<CategoryListDto> }>()
);
export const listDataLoadFailed = createAction(
    '[Admin/Categories] List data load failed',
    props<{ error: any }>()
);
export const createFormSubmitted = createAction(
    '[Admin/Categories] Create form submitted',
    props<{ form: FormGroup }>()
);
