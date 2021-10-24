import { PagedResultDto } from '@abp/ng.core';
import { createAction, props } from '@ngrx/store';
import { RecipeListDto } from '@proxy/recipes';

export const pageLoaded = createAction('[Admin/Recipes] Page loaded');
export const listInputChanged = createAction('[Admin/Recipes] List input changed');
export const listDataLoaded = createAction(
    '[Admin/Recipes] List data loaded',
    props<{ data: PagedResultDto<RecipeListDto> }>()
);
export const listDataLoadFailed = createAction(
    '[Admin/Recipes] List data load failed',
    props<{ error: any }>()
);
