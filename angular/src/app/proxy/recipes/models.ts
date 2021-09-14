import type { EntityDto, FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { CategorySimpleDto } from '../categories/models';

export interface GetRecipesInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
}

export interface RecipeCreateDto {
  categoryId?: string;
  description?: string;
  forAmount?: number;
  forUnit?: string;
  ingredients: RecipeIngredientCreateDto[];
  name: string;
  photo: number[];
  steps: RecipeStepCreateDto[];
}

export interface RecipeDto extends FullAuditedEntityDto<string> {
  category: CategorySimpleDto;
  description?: string;
  forAmount?: number;
  forUnit?: string;
  ingredients: RecipeIngredientDto[];
  name?: string;
  photoId?: string;
  steps: RecipeStepDto[];
}

export interface RecipeIngredientCreateDto {
  amount: number;
  name: string;
  sortOrder?: number;
  unit?: string;
}

export interface RecipeIngredientDto extends EntityDto<string> {
  amount: number;
  name?: string;
  sortOrder?: number;
  unit?: string;
}

export interface RecipeIngredientUpdateDto extends EntityDto<string> {
  amount: number;
  name: string;
  sortOrder?: number;
  unit?: string;
}

export interface RecipeListDto extends EntityDto<string> {
  category: CategorySimpleDto;
  description?: string;
  forAmount?: number;
  forUnit?: string;
  name?: string;
  photoId?: string;
}

export interface RecipeStepCreateDto {
  instructions: string;
  number: number;
}

export interface RecipeStepDto extends EntityDto<string> {
  instructions?: string;
  number: number;
}

export interface RecipeStepUpdateDto extends EntityDto<string> {
  instructions: string;
  number: number;
}

export interface RecipeUpdateDto {
  categoryId?: string;
  description?: string;
  forAmount?: number;
  forUnit?: string;
  ingredients: RecipeIngredientUpdateDto[];
  name: string;
  photo: number[];
  steps: RecipeStepUpdateDto[];
}
