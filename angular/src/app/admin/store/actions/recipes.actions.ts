import { PagedResultDto } from '@abp/ng.core';
import { createAction, props } from '@ngrx/store';
import { RecipeListDto, RecipeListInputDto } from '@proxy/recipes';

export const loadRecipes = createAction(
    '[Admin/Recipes] Load Recipes',
    props<{ input: RecipeListInputDto }>()
);

export const loadRecipesSuccess = createAction(
    '[Admin/Recipes] Load Recipes Success',
    props<{ data: PagedResultDto<RecipeListDto> }>()
);

export const loadRecipesFailure = createAction(
    '[Admin/Recipes] Load Recipes Failure',
    props<{ error: any }>()
);
