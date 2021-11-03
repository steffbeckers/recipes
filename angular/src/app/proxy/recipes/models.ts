import type { FileDto, FileInputDto } from '../files/models';
import type { EntityDto, FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { CategorySimpleDto } from '../categories/models';

export interface RecipeCreateInputDto {
  categoryId: string;
  description?: string;
  forAmount?: number;
  forUnit?: string;
  ingredients: RecipeIngredientCreateInputDto[];
  name: string;
  photo: FileInputDto;
  steps: RecipeStepCreateInputDto[];
}

export interface RecipeDto extends FullAuditedEntityDto<string> {
  category: CategorySimpleDto;
  categoryId?: string;
  description?: string;
  forAmount?: number;
  forUnit?: string;
  ingredients: RecipeIngredientDto[];
  name?: string;
  photo: FileDto;
  steps: RecipeStepDto[];
}

export interface RecipeIngredientCreateInputDto {
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

export interface RecipeIngredientUpdateInputDto extends EntityDto<string> {
  amount: number;
  name: string;
  sortOrder?: number;
  unit?: string;
}

export interface RecipeListDto extends EntityDto<string> {
  category: CategorySimpleDto;
  categoryId?: string;
  description?: string;
  forAmount?: number;
  forUnit?: string;
  name?: string;
  photo: FileDto;
}

export interface RecipeListInputDto extends PagedAndSortedResultRequestDto {
  filterText?: string;
}

export interface RecipeStepCreateInputDto {
  instructions: string;
  number: number;
}

export interface RecipeStepDto extends EntityDto<string> {
  instructions?: string;
  number: number;
}

export interface RecipeStepUpdateInputDto extends EntityDto<string> {
  instructions: string;
  number: number;
}

export interface RecipeUpdateInputDto {
  categoryId?: string;
  deletePhoto: boolean;
  description?: string;
  forAmount?: number;
  forUnit?: string;
  ingredients: RecipeIngredientUpdateInputDto[];
  name: string;
  photo: FileInputDto;
  steps: RecipeStepUpdateInputDto[];
}
