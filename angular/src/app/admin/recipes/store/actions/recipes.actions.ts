import { PagedResultDto } from '@abp/ng.core';
import { FormGroup } from '@angular/forms';
import { createAction, props } from '@ngrx/store';
import { RecipeDto, RecipeListDto, RecipeListInputDto } from '@proxy/recipes';

export const listPageLoaded = createAction('[Admin/Recipes] List page loaded');
export const createPageLoaded = createAction('[Admin/Recipes] Create page loaded');
export const listInputChanged = createAction(
    '[Admin/Recipes] List input changed',
    props<{ input: RecipeListInputDto }>()
);
export const listDataLoaded = createAction(
    '[Admin/Recipes] List data loaded',
    props<{ data: PagedResultDto<RecipeListDto> }>()
);
export const listDataLoadFailed = createAction(
    '[Admin/Recipes] List data load failed',
    props<{ error: any }>()
);
export const createFormSubmitted = createAction(
    '[Admin/Recipes] Create form submitted',
    props<{ form: FormGroup }>()
);
export const recipeCreated = createAction(
    '[Admin/Recipes] Recipe created',
    props<{ data: RecipeDto }>()
);
export const recipeCreationFailed = createAction(
    '[Admin/Recipes] Recipe creation failed',
    props<{ error: any }>()
);
