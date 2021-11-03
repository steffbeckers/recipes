import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { IActionResult } from '../microsoft/asp-net-core/mvc/models';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  apiName = 'Default';

  get = (id: string) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: `/api/files/${id}`,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
