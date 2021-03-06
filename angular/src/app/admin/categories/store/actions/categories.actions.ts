import { PagedResultDto } from '@abp/ng.core';
import { createAction, props } from '@ngrx/store';
import {
    CategoryCreateInputDto,
    CategoryDto,
    CategoryListDto,
    CategoryUpdateInputDto,
} from '@proxy/categories';

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

export const detailPageLoaded = createAction('[Admin/Categories] Detail page loaded');
export const detailDataLoaded = createAction(
    '[Admin/Categories] Detail data loaded',
    props<{ data: CategoryDto }>()
);
export const detailDataLoadFailed = createAction(
    '[Admin/Categories] Detail data load failed',
    props<{ error: any }>()
);

export const createPageLoaded = createAction('[Admin/Categories] Create page loaded');
export const createCategory = createAction(
    '[Admin/Categories] Create category',
    props<{ input: CategoryCreateInputDto }>()
);
export const categoryCreated = createAction(
    '[Admin/Categories] Category created',
    props<{ data: CategoryDto }>()
);
export const categoryCreationFailed = createAction(
    '[Admin/Categories] Category creation failed',
    props<{ error: any }>()
);

export const updateCategory = createAction(
    '[Admin/Categories] Update category',
    props<{ id: string; input: CategoryUpdateInputDto }>()
);
export const categoryUpdated = createAction(
    '[Admin/Categories] Category updated',
    props<{ data: CategoryDto }>()
);
export const categoryUpdateFailed = createAction(
    '[Admin/Categories] Category update failed',
    props<{ error: any }>()
);

export const deleteCategory = createAction(
    '[Admin/Categories] Delete category',
    props<{ id: string }>()
);
export const categoryDeleted = createAction(
    '[Admin/Categories] Category deleted',
    props<{ id: string }>()
);
export const categoryDeletionFailed = createAction(
    '[Admin/Categories] Category deletion failed',
    props<{ error: any }>()
);
