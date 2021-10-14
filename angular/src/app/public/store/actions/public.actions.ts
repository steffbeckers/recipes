import { PagedResultDto } from '@abp/ng.core';
import { createAction, props } from '@ngrx/store';
import { RecipeListDto, RecipeListInputDto } from '@proxy/recipes';

export const loadRecipes = createAction(
  '[Public] Load Recipes',
  props<{ input: RecipeListInputDto }>()
);

export const loadRecipesSuccess = createAction(
  '[Public] Load Recipes Success',
  props<{ recipes: PagedResultDto<RecipeListDto> }>()
);

export const loadRecipesFailure = createAction(
  '[Public] Load Recipes Failure',
  props<{ error: any }>()
);
