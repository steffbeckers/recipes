import type { CategoryCreateInputDto, CategoryDto, CategoryListDto, CategoryListInputDto, CategoryRecipeListDto, CategoryRecipeListInputDto, CategoryUpdateInputDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { LookupDto, LookupInputDto } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  apiName = 'Default';

  create = (input: CategoryCreateInputDto) =>
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

  getList = (input: CategoryListInputDto) =>
    this.restService.request<any, PagedResultDto<CategoryListDto>>({
      method: 'GET',
      url: '/api/categories',
      params: { filterText: input.filterText, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  getLookup = (input: LookupInputDto) =>
    this.restService.request<any, PagedResultDto<LookupDto<string>>>({
      method: 'GET',
      url: '/api/categories/lookup',
      params: { filterText: input.filterText, id: input.id, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  getRecipeList = (id: string, input: CategoryRecipeListInputDto) =>
    this.restService.request<any, PagedResultDto<CategoryRecipeListDto>>({
      method: 'GET',
      url: `/api/categories/${id}/recipes`,
      params: { filterText: input.filterText, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: CategoryUpdateInputDto) =>
    this.restService.request<any, CategoryDto>({
      method: 'PUT',
      url: `/api/categories/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
