import { PagedResultDto } from '@abp/ng.core';
import { createAction, props } from '@ngrx/store';
import { RecipeListDto } from '@proxy/recipes';

export const loadRecipes = createAction('[Admin/Recipes] Load Recipes');
export const loadRecipesSuccess = createAction(
    '[Admin/Recipes] Load Recipes Success',
    props<{ data: PagedResultDto<RecipeListDto> }>()
);
export const loadRecipesFailure = createAction(
    '[Admin/Recipes] Load Recipes Failure',
    props<{ error: any }>()
);
