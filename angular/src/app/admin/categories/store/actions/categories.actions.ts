import { PagedResultDto } from '@abp/ng.core';
import { FormGroup } from '@angular/forms';
import { createAction, props } from '@ngrx/store';
import { CategoryListDto } from '@proxy/categories';
import { LookupDto } from '@proxy/shared';

export const listPageLoaded = createAction('[Admin/Categories] List page loaded');
export const listPaginationChanged = createAction(
    '[Admin/Categories] List pagination changed',
    props<{ currentPage?: number; itemsPerPage?: number }>()
);
export const listDataLoaded = createAction(
    '[Admin/Categories] List data loaded',
    props<{ data: PagedResultDto<CategoryListDto> }>()
);
export const listDataLoadFailed = createAction(
    '[Admin/Categories] List data load failed',
    props<{ error: any }>()
);

export const lookupDataLoaded = createAction(
    '[Admin/Categories] Lookup data loaded',
    props<{ data: PagedResultDto<LookupDto<string>> }>()
);
export const lookupDataLoadFailed = createAction(
    '[Admin/Categories] Lookup data load failed',
    props<{ error: any }>()
);

export const createFormSubmitted = createAction(
    '[Admin/Categories] Create form submitted',
    props<{ form: FormGroup }>()
);
