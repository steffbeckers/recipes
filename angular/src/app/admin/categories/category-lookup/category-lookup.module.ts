import { NgModule } from '@angular/core';
import { CategoryLookupComponent } from './category-lookup.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [CategoryLookupComponent],
    imports: [SharedModule],
    exports: [CategoryLookupComponent],
})
export class CategoryLookupModule {}
