import { PagedResultDto } from '@abp/ng.core';
import { createAction, props } from '@ngrx/store';
import {
    RecipeCreateInputDto,
    RecipeDto,
    RecipeListDto,
    RecipeUpdateInputDto,
} from '@proxy/recipes';

export const listPageLoaded = createAction('[Admin/Recipes] List page loaded');
export const listDataLoaded = createAction(
    '[Admin/Recipes] List data loaded',
    props<{ data: PagedResultDto<RecipeListDto> }>()
);
export const listDataLoadFailed = createAction(
    '[Admin/Recipes] List data load failed',
    props<{ error: any }>()
);

export const detailPageLoaded = createAction('[Admin/Recipes] Detail page loaded');
export const detailDataLoaded = createAction(
    '[Admin/Recipes] Detail data loaded',
    props<{ data: RecipeDto }>()
);
export const detailDataLoadFailed = createAction(
    '[Admin/Recipes] Detail data load failed',
    props<{ error: any }>()
);

export const createPageLoaded = createAction('[Admin/Recipes] Create page loaded');
export const createFormSubmitted = createAction(
    '[Admin/Recipes] Create form submitted',
    props<{ input: RecipeCreateInputDto }>()
);
export const recipeCreated = createAction(
    '[Admin/Recipes] Recipe created',
    props<{ data: RecipeDto }>()
);
export const recipeCreationFailed = createAction(
    '[Admin/Recipes] Recipe creation failed',
    props<{ error: any }>()
);

export const updateFormSubmitted = createAction(
    '[Admin/Recipes] Update form submitted',
    props<{ id: string; input: RecipeUpdateInputDto }>()
);
export const recipeUpdated = createAction(
    '[Admin/Recipes] Recipe updated',
    props<{ data: RecipeDto }>()
);
export const recipeUpdateFailed = createAction(
    '[Admin/Recipes] Recipe update failed',
    props<{ error: any }>()
);
