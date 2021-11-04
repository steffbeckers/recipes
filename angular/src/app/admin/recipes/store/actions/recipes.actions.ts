import { PagedResultDto } from '@abp/ng.core';
import { createAction, props } from '@ngrx/store';
import {
    RecipeCreateInputDto,
    RecipeDto,
    RecipeListDto,
    RecipeUpdateInputDto,
} from '@proxy/recipes';

export const listPageLoaded = createAction('[Admin/Recipes] List page loaded');
export const listPaginationChanged = createAction(
    '[Admin/Recipes] List pagination changed',
    props<{ currentPage?: number; itemsPerPage?: number }>()
);
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
export const createRecipe = createAction(
    '[Admin/Recipes] Create recipe',
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

export const updateRecipe = createAction(
    '[Admin/Recipes] Update recipe',
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

export const deleteRecipe = createAction('[Admin/Recipes] Delete recipe', props<{ id: string }>());
export const recipeDeleted = createAction(
    '[Admin/Recipes] Recipe deleted',
    props<{ id: string }>()
);
export const recipeDeletionFailed = createAction(
    '[Admin/Recipes] Recipe deletion failed',
    props<{ error: any }>()
);
