import type { EntityDto } from '@abp/ng.core';

export interface CategorySimpleDto extends EntityDto<string> {
  description?: string;
  name?: string;
  photoId?: string;
}
