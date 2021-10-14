import type { FileDto, FileInputDto } from '../files/models';
import type { EntityDto, FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CategoryCreateInputDto {
  description?: string;
  name: string;
  photo: FileInputDto;
  sortOrder?: number;
}

export interface CategoryDto extends FullAuditedEntityDto<string> {
  description?: string;
  name?: string;
  photo: FileDto;
  sortOrder?: number;
}

export interface CategoryListDto extends EntityDto<string> {
  description?: string;
  name?: string;
  photo: FileDto;
  sortOrder?: number;
}

export interface CategoryListInputDto extends PagedAndSortedResultRequestDto {
  filterText?: string;
}

export interface CategoryRecipeListDto {
  description?: string;
  forAmount?: number;
  forUnit?: string;
  name?: string;
  photo: FileDto;
}

export interface CategoryRecipeListInputDto extends PagedAndSortedResultRequestDto {
  filterText?: string;
}

export interface CategorySimpleDto extends EntityDto<string> {
  description?: string;
  name?: string;
  photo: FileDto;
}

export interface CategoryUpdateInputDto {
  deletePhoto: boolean;
  description?: string;
  name: string;
  photo: FileInputDto;
  sortOrder?: number;
}
