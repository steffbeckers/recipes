import type { EntityDto, FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CategoryCreateDto {
  description?: string;
  name: string;
  photo: number[];
  sortOrder?: number;
}

export interface CategoryDto extends FullAuditedEntityDto<string> {
  description?: string;
  name?: string;
  photoId?: string;
  sortOrder?: number;
}

export interface CategoryListDto extends EntityDto<string> {
  description?: string;
  name?: string;
  photoId?: string;
  sortOrder?: number;
}

export interface CategoryRecipeListDto {
  description?: string;
  forAmount?: number;
  forUnit?: string;
  name?: string;
  photoId?: string;
}

export interface CategorySimpleDto extends EntityDto<string> {
  description?: string;
  name?: string;
  photoId?: string;
}

export interface CategoryUpdateDto {
  description?: string;
  name: string;
  photo: number[];
  sortOrder?: number;
}

export interface GetCategoriesInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
}

export interface GetCategoryRecipesInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
}
