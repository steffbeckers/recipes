import { CoreModule } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxValidateCoreModule } from '@ngx-validate/core';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        CoreModule,
        ThemeSharedModule,
        NgbTypeaheadModule,
        NgxValidateCoreModule,
    ],
    exports: [
        CommonModule,
        CoreModule,
        ThemeSharedModule,
        NgbTypeaheadModule,
        NgxValidateCoreModule,
    ],
    providers: [],
})
export class SharedModule {}
