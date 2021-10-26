import { PagedResultDto } from '@abp/ng.core';
import { FormGroup } from '@angular/forms';
import { createAction, props } from '@ngrx/store';
import { RecipeListDto, RecipeListInputDto } from '@proxy/recipes';

export const pageLoaded = createAction('[Admin/Recipes] Page loaded');
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
