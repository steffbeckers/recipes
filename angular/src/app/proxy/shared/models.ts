import type { EntityDto, PagedResultRequestDto } from '@abp/ng.core';

export interface LookupDto<TKey> extends EntityDto<TKey> {
  name?: string;
}

export interface LookupRequestDto extends PagedResultRequestDto {
  filterText?: string;
}
