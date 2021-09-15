import { PagedResultDto } from '@abp/ng.core';
import { createAction, props } from '@ngrx/store';
import { GetRecipesInput, RecipeListDto } from '@proxy/recipes';

export const loadRecipes = createAction(
  '[Public] Load Recipes',
  props<{ input: GetRecipesInput }>()
);

export const loadRecipesSuccess = createAction(
  '[Public] Load Recipes Success',
  props<{ recipes: PagedResultDto<RecipeListDto> }>()
);

export const loadRecipesFailure = createAction(
  '[Public] Load Recipes Failure',
  props<{ error: any }>()
);
