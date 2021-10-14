import type { EntityDto } from '@abp/ng.core';

export interface FileDto extends EntityDto<string> {
  contentType?: string;
  name?: string;
}

export interface FileInputDto {
  contentType: string;
  data: number[];
  name: string;
}
