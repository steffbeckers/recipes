import type { GetRecipesInput, RecipeCreateDto, RecipeDto, RecipeListDto, RecipeUpdateDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  apiName = 'Default';

  create = (input: RecipeCreateDto) =>
    this.restService.request<any, RecipeDto>({
      method: 'POST',
      url: '/api/recipes',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/recipes/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, RecipeDto>({
      method: 'GET',
      url: `/api/recipes/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: GetRecipesInput) =>
    this.restService.request<any, PagedResultDto<RecipeListDto>>({
      method: 'GET',
      url: '/api/recipes',
      params: { filterText: input.filterText, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: RecipeUpdateDto) =>
    this.restService.request<any, RecipeDto>({
      method: 'PUT',
      url: `/api/recipes/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
