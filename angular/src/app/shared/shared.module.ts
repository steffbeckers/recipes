import { CoreModule } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreModule,
  ],
  exports: [
    CommonModule,
    CoreModule,
  ],
  providers: []
})
export class SharedModule {}
