import type { CategoryCreateDto, CategoryDto, CategoryListDto, CategoryRecipeListDto, CategoryUpdateDto, GetCategoriesInput, GetCategoryRecipesInput } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { LookupDto, LookupRequestDto } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  apiName = 'Default';

  create = (input: CategoryCreateDto) =>
    this.restService.request<any, CategoryDto>({
      method: 'POST',
      url: '/api/categories',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/categories/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, CategoryDto>({
      method: 'GET',
      url: `/api/categories/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: GetCategoriesInput) =>
    this.restService.request<any, PagedResultDto<CategoryListDto>>({
      method: 'GET',
      url: '/api/categories',
      params: { filterText: input.filterText, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  getLookup = (input: LookupRequestDto) =>
    this.restService.request<any, PagedResultDto<LookupDto<string>>>({
      method: 'GET',
      url: '/api/categories/lookup',
      params: { filterText: input.filterText, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  getRecipesList = (id: string, input: GetCategoryRecipesInput) =>
    this.restService.request<any, PagedResultDto<CategoryRecipeListDto>>({
      method: 'GET',
      url: `/api/categories/${id}/recipes`,
      params: { filterText: input.filterText, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: CategoryUpdateDto) =>
    this.restService.request<any, CategoryDto>({
      method: 'PUT',
      url: `/api/categories/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
